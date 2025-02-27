import { Configuration } from './generated/runtime';
import {
  TenantConfigApi,
  UsersApi,
  TenantsApi,
  SigninApi,
  SignupApi,
  ConversationsApi,
  ConversationTypesApi,
  ParticipantsApi,
  MessagesApi,
  GeocodingApi,
  APIKeysApi,
  SMSSettingsApi,
  OIDCConfigsApi,
  PasswordResetApi,
  SigninOptionsRequest,
  ConversationLabelsApi,
  WebhooksApi,
} from './generated/apis';
import { AuthenticationOptions, TenantConfig } from './generated/models';
import { WireWebsocketConnection } from './wire-websocket-connection';
import {
  ClientWireEventMap,
  SUBSCRIPTION_ERROR_EVENT,
  AUTHENTICATION_ERROR_EVENT,
  NEW_CONVERSATION_EVENT,
  CONVERSATION_READ_STATUS_EVENT,
} from './wire-events';
import { TokenManager } from './token-manager';
import { createFetchWithRefresh } from './fetch-with-refresh';
import * as logger from './logger';
import { LogLevel } from './logger';

export class ClientWireApiClient extends EventTarget {
  private _basePath: string;
  private apiConfig: Configuration;

  private instanceId = Math.random().toString(36).substring(2);
  private tokenManager: TokenManager;

  public tenantConfigApi: TenantConfigApi;
  private signinApi: SigninApi;
  public signupApi: SignupApi;
  public passwordResetApi: PasswordResetApi;
  public webhooksApi: WebhooksApi;
  public conversationsApi: ConversationsApi;
  public conversationTypesApi: ConversationTypesApi;
  public conversationLabelsApi: ConversationLabelsApi;
  public participantsApi: ParticipantsApi;
  public messagesApi: MessagesApi;
  public geocodingApi: GeocodingApi;
  public apiKeysApi: APIKeysApi;
  public oidcConfigsApi: OIDCConfigsApi;
  public smsSettingsApi: SMSSettingsApi;
  public usersApi: UsersApi;
  public tenantsApi: TenantsApi;

  public tenantConfig?: TenantConfig;
  private websocketConnection?: WireWebsocketConnection;

  /**
   * Keep track of how many listeners exist for each event name.
   * If >0, we are "subscribed" to that channel (if it is a WS channel).
   */
  private listenerCounts = new Map<keyof ClientWireEventMap | string, number>();

  constructor(
    basePath: string = 'https://api.production.clientwire.net',
    logLevel: LogLevel = 'warn'
  ) {
    super();

    logger.setLogLevel(logLevel);

    this._basePath = basePath;
    this.tokenManager = new TokenManager();

    this.apiConfig = new Configuration({
      basePath: this._basePath,
      accessToken: async (): Promise<string> => {
        return this.tokenManager.getAccessToken() || '';
      },
      fetchApi: createFetchWithRefresh(
        this.tokenManager,
        () => {
          logger.debug('[ClientWireApi] Tokens refreshed');
          if (!this.isConnected()) {
            this.websocketConnection?.connect();
          }
        },
        () => {
          logger.warn('[ClientWireApi] Tokens could not be refreshed');
          this.dispatchEvent(
            new CustomEvent(AUTHENTICATION_ERROR_EVENT, {
              detail: { reason: 'Could not refresh tokens' },
            })
          );
        }
      ),
    });

    this.tenantConfigApi = new TenantConfigApi(this.apiConfig);
    this.signinApi = new SigninApi(this.apiConfig);
    this.signupApi = new SignupApi(this.apiConfig);
    this.passwordResetApi = new PasswordResetApi(this.apiConfig);

    // Apis gets re-initialized later with appropriate headers
    this.usersApi = new UsersApi(this.apiConfig);
    this.tenantsApi = new TenantsApi(this.apiConfig);
    this.webhooksApi = new WebhooksApi(this.apiConfig);
    this.conversationsApi = new ConversationsApi(this.apiConfig);
    this.conversationTypesApi = new ConversationTypesApi(this.apiConfig);
    this.participantsApi = new ParticipantsApi(this.apiConfig);
    this.messagesApi = new MessagesApi(this.apiConfig);
    this.geocodingApi = new GeocodingApi(this.apiConfig);
    this.apiKeysApi = new APIKeysApi(this.apiConfig);
    this.oidcConfigsApi = new OIDCConfigsApi(this.apiConfig);
    this.smsSettingsApi = new SMSSettingsApi(this.apiConfig);
    this.conversationLabelsApi = new ConversationLabelsApi(this.apiConfig);
    logger.debug('[ClientWireApi] New instance created: ', this.instanceId);
  }

  public get basePath(): string {
    return this._basePath;
  }

  //#region Tenant Config

  public async getTenantConfigForSubdomain(subdomain: string) {
    return this.tenantConfigApi.getTenantConfig({ tenantSubdomain: subdomain });
  }

  public async getTenantConfigForTenantId(id: string) {
    return this.tenantConfigApi.getTenantConfig({ tenantId: id });
  }

  //#endregion

  //#region Authentication

  public logout(): void {
    this.websocketConnection?.disconnect();
    this.websocketConnection = undefined;
    this.tokenManager.clearTokens();
    this.tokenManager.clearRefreshCallback();
  }

  public async signInWithEmailAndPassword(tenantId: string, email: string, password: string) {
    this.logout();

    const requestParameters = {
      grantType: 'password',
      tenantId: tenantId,
      username: email,
      password: password,
    };

    const response = await this.signinApi.oauth2TokenEndpoint(requestParameters);
    this.tokenManager.setTokens(tenantId, response.accessToken, response.refreshToken);

    // Set up a refresh callback, IF we have a refresh token
    if (response.refreshToken) {
      this.tokenManager.setRefreshCallback(async () => {
        try {
          const currentRefreshToken = this.tokenManager.getRefreshToken();

          const refreshRequestParameters = {
            tenantId: tenantId,
            grantType: 'refresh_token',
            refresh_token: currentRefreshToken,
          };
          const refreshResponse =
            await this.signinApi.oauth2TokenEndpoint(refreshRequestParameters);
          this.tokenManager.setTokens(
            tenantId,
            refreshResponse.accessToken,
            refreshResponse.refreshToken
          );

          return true;
        } catch (e) {
          logger.error('[ClientWireApi#signInWithEmailAndPassword] Refresh failed:', e);
          return false;
        }
      });
    } else {
      // If response.refreshToken is empty, we *cannot* refresh.
      // So set a fallback callback that indicates refresh is impossible.
      this.tokenManager.setRefreshCallback(async () => false);
    }

    this.setupWebsocket();
    return response;
  }

  public async signInWithTokenExchangeParticipantAuthKey(
    tenantId: string,
    authKey: string | (() => string | Promise<string>) | Promise<string>
  ) {
    this.logout();

    // 1. Resolve the incoming 'authKey' to a string for the initial sign-in
    let resolvedToken: string;
    if (authKey instanceof Promise) {
      resolvedToken = await authKey;
    } else if (typeof authKey === 'function') {
      const possiblePromise = authKey();
      resolvedToken = possiblePromise instanceof Promise ? await possiblePromise : possiblePromise;
    } else {
      resolvedToken = authKey;
    }

    // 2. Make the token-exchange request
    const requestParameters = {
      grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
      tenantId: tenantId,
      subjectToken: resolvedToken,
      subjectTokenType: 'urn:clientwire:token-type:client-participant-auth-key',
    };
    const response = await this.signinApi.oauth2TokenEndpoint(requestParameters);

    // 3. Store the newly retrieved tokens
    this.tokenManager.setTokens(tenantId, response.accessToken, response.refreshToken);

    // 4. Set up a refresh callback, IF we have a function to generate new tokens
    if (typeof authKey === 'function') {
      // If 'authKey' was a function, we expect we can call it again to get a *new* participant auth key
      this.tokenManager.setRefreshCallback(async () => {
        try {
          // Re-invoke the function to get the latest participant auth key
          const possiblePromise = authKey();
          const nextAuthKey =
            possiblePromise instanceof Promise ? await possiblePromise : possiblePromise;

          // Then do the token exchange again
          const refreshParams = {
            grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
            tenantId: tenantId,
            subjectToken: nextAuthKey,
            subjectTokenType: 'urn:clientwire:token-type:client-participant-auth-key',
          };
          const refreshResponse = await this.signinApi.oauth2TokenEndpoint(refreshParams);

          // Store them
          this.tokenManager.setTokens(
            tenantId,
            refreshResponse.accessToken,
            refreshResponse.refreshToken
          );
          return true;
        } catch (e) {
          logger.error(
            '[ClientWireApi#signInWithTokenExchangeParticipantAuthKey] Refresh failed:',
            e
          );
          return false;
        }
      });
    } else {
      // If authKey is just a string or a single Promise, we *cannot* truly refresh
      // (we have no way to get a new subject token).
      // So set a fallback callback that indicates refresh is impossible.
      this.tokenManager.setRefreshCallback(async () => false);
    }

    // 5. Finally, set up the WebSocket connection.
    this.setupWebsocket();

    return response;
  }

  public async signInWithTokenExchangeAccessToken(
    tenantId: string,
    token: string | (() => string | Promise<string>) | Promise<string>
  ) {
    this.logout();

    // 1. Resolve the incoming 'token' to a string for the initial sign-in
    let resolvedToken: string;
    if (token instanceof Promise) {
      resolvedToken = await token;
    } else if (typeof token === 'function') {
      const possiblePromise = token();
      resolvedToken = possiblePromise instanceof Promise ? await possiblePromise : possiblePromise;
    } else {
      resolvedToken = token;
    }

    // 2. Make the token-exchange request
    const requestParameters = {
      grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
      tenantId: tenantId,
      subjectToken: resolvedToken,
      subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
    };
    const response = await this.signinApi.oauth2TokenEndpoint(requestParameters);

    // 3. Store the tokens — in this flow, we only want to store an access token (no refresh token).
    this.tokenManager.setTokens(tenantId, response.accessToken, null);

    // 4. If `token` is a function, set a refresh callback that re-invokes the function for a new token
    if (typeof token === 'function') {
      this.tokenManager.setRefreshCallback(async () => {
        try {
          // Re-invoke the function to get the latest participant auth key
          const possiblePromise = token();
          const nextToken =
            possiblePromise instanceof Promise ? await possiblePromise : possiblePromise;

          const refreshParams = {
            grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
            tenantId: tenantId,
            subjectToken: nextToken,
            subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
          };
          const refreshResponse = await this.signinApi.oauth2TokenEndpoint(refreshParams);

          // Store new tokens again (here, ignoring any refresh token returned)
          this.tokenManager.setTokens(tenantId, refreshResponse.accessToken, null);
          return true;
        } catch (err) {
          logger.error(
            '[ClientWireApi#signInWithTokenExchangeAccessToken] Refresh with token function failed:',
            err
          );
          return false;
        }
      });
    } else {
      // If user just passed a string, we have no way to get a *new* token in the future,
      // so we provide a "no-op" refresh callback that returns false.
      this.tokenManager.setRefreshCallback(async () => false);
    }

    // 5. Setup WebSocket connection
    this.setupWebsocket();

    return response;
  }

  public async signInWithStoredCredentials() {
    let currentTenantId = this.tokenManager.getTenantId();
    let currentAccessToken = this.tokenManager.getAccessToken();
    let currentRefreshToken = this.tokenManager.getRefreshToken();
    this.logout();

    if (currentAccessToken && currentTenantId) {
      this.tokenManager.setTokens(currentTenantId, currentAccessToken, currentRefreshToken);
      this.setupWebsocket();
    } else {
      return;
    }

    // Set up a refresh callback, IF we have a refresh token
    if (currentRefreshToken) {
      this.tokenManager.setRefreshCallback(async () => {
        try {
          const currentTenantId = this.tokenManager.getTenantId();
          const currentRefreshToken = this.tokenManager.getRefreshToken();

          if (!currentTenantId || !currentRefreshToken) {
            logger.error(
              '[ClientWireApi#signInWithStoredCredentials] No tenantId or refreshToken found.'
            );
            return false;
          }

          const refreshRequestParameters = {
            tenantId: currentTenantId,
            grantType: 'refresh_token',
            refreshToken: currentRefreshToken,
          };
          const refreshResponse =
            await this.signinApi.oauth2TokenEndpoint(refreshRequestParameters);
          this.tokenManager.setTokens(
            currentTenantId,
            refreshResponse.accessToken,
            refreshResponse.refreshToken
          );

          return true;
        } catch (e) {
          logger.error('[ClientWireApi#signInWithStoredCredentials] Refresh failed:', e);
          return false;
        }
      });
    } else {
      // If response.refreshToken is empty, we *cannot* refresh.
      // So set a fallback callback that indicates refresh is impossible.
      this.tokenManager.setRefreshCallback(async () => false);
    }
  }

  public static get hasCredentials(): boolean {
    return TokenManager.hasAccessToken();
  }
  public get hasCredentials(): boolean {
    return this.tokenManager.hasAccessToken();
  }
  //#endregion

  //#region Websocket & Websocket Subscription Management
  private subscribe(address: string): void {
    if (this.websocketConnection) {
      this.websocketConnection.subscribe(address);
    } else {
      throw new Error(`No websocket connection. Cannot subscribe to ${address}.`);
    }
  }

  private unsubscribe(address: string): void {
    if (this.websocketConnection) {
      this.websocketConnection.unsubscribe(address);
    }
  }

  public isConnected(): boolean {
    if (this.websocketConnection) {
      return this.websocketConnection.isConnected;
    }
    return false;
  }

  private setupWebsocket() {
    this.websocketConnection = new WireWebsocketConnection(this, this._basePath, this.tokenManager);
    this.websocketConnection.connect();
  }
  //#endregion

  //#region EventTarget / Event Handling
  /**
   * We define a single "on" method for typed events.
   * If the event is "conversations:new" or "conversations:<id>", we auto-subscribe to WS.
   * Returns an "off()" function to unsubscribe.
   */
  public on<K extends keyof ClientWireEventMap>(
    eventName: K,
    callback: (payload: ClientWireEventMap[K]) => void
  ): () => void {
    // Wrap the callback for EventTarget
    const listener = (evt: Event) => {
      const customEvt = evt as CustomEvent<ClientWireEventMap[K]>;
      callback(customEvt.detail);
    };

    // Register with the browser's built-in EventTarget
    this.addEventListener(eventName, listener);

    // Increase listener count
    const currentCount = this.listenerCounts.get(eventName) || 0;
    const newCount = currentCount + 1;
    this.listenerCounts.set(eventName, newCount);

    // If this is the first listener for a conversation event, subscribe
    if (newCount === 1 && this.isWebsocketEvent(eventName)) {
      // Attempt the actual subscription
      try {
        this.subscribe(eventName);
      } catch (err) {
        logger.error('[ClientWireApi] Subscription to', eventName, 'failed:', err);

        this.removeEventListener(eventName, listener);
        this.listenerCounts.set(eventName, currentCount);
        this.dispatchEvent(
          new CustomEvent(SUBSCRIPTION_ERROR_EVENT, {
            detail: { reason: 'Could not subscribe to ' + eventName },
          })
        );
      }
    }

    // Return an "off()" function
    return () => {
      this.removeEventListener(eventName, listener);
      const oldCount = this.listenerCounts.get(eventName) || 0;
      if (oldCount > 0) {
        const dec = oldCount - 1;
        this.listenerCounts.set(eventName, dec);
        // If no more listeners, unsubscribe
        if (dec === 0 && this.isWebsocketEvent(eventName)) {
          this.unsubscribe(eventName);
        }
      }
    };
  }

  private isWebsocketEvent(eventName: keyof ClientWireEventMap | string): boolean {
    if (typeof eventName !== 'string') return false;
    return (
      eventName.startsWith('conversations:') ||
      eventName === NEW_CONVERSATION_EVENT ||
      eventName === CONVERSATION_READ_STATUS_EVENT
    );
  }
  //#endregion

  public async getSignInOptions(
    signIngOptionsRequest: SigninOptionsRequest
  ): Promise<AuthenticationOptions> {
    return this.signinApi.signinOptions(signIngOptionsRequest);
  }
}
