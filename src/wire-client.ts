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
} from './generated/apis';
import { TenantConfig } from './generated/models';
import { WireWebsocketConnection } from './wire-websocket-connection';
import {
  WireClientEventMap,
  SUBSCRIPTION_ERROR_EVENT,
  AUTHENTICATION_ERROR_EVENT,
} from './wire-events';
import { TokenManager } from './token-manager';
import { createFetchWithRefresh } from './fetch-with-refresh';

export class WireClient extends EventTarget {
  private _basePath: string;
  private apiConfig: Configuration;

  private instanceId = Math.random().toString(36).substring(2);
  private tokenManager: TokenManager;

  public tenantConfigApi: TenantConfigApi;
  private signinApi: SigninApi;
  public signupApi: SignupApi;

  public conversationsApi: ConversationsApi;
  public conversationTypesApi: ConversationTypesApi;
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
  private listenerCounts = new Map<keyof WireClientEventMap | string, number>();

  constructor(basePath: string = 'https://api.production.clientwire.net') {
    super();
    console.log(basePath);

    this._basePath = basePath;
    this.tokenManager = new TokenManager(basePath);

    this.apiConfig = new Configuration({
      basePath: this._basePath,
      accessToken: async (): Promise<string> => {
        return this.tokenManager.getAccessToken() || '';
      },
      fetchApi: createFetchWithRefresh(
        this.tokenManager,
        () => {
          this.handleTokensRefreshed();
        },
        () => {
          this.handleTokensCouldNotRefresh();
        }
      ),
    });

    this.tenantConfigApi = new TenantConfigApi(this.apiConfig);
    this.signinApi = new SigninApi(this.apiConfig);
    this.signupApi = new SignupApi(this.apiConfig);

    // Apis gets re-initialized later with appropriate headers
    this.usersApi = new UsersApi(this.apiConfig);
    this.tenantsApi = new TenantsApi(this.apiConfig);
    this.conversationsApi = new ConversationsApi(this.apiConfig);
    this.conversationTypesApi = new ConversationTypesApi(this.apiConfig);
    this.participantsApi = new ParticipantsApi(this.apiConfig);
    this.messagesApi = new MessagesApi(this.apiConfig);
    this.geocodingApi = new GeocodingApi(this.apiConfig);
    this.apiKeysApi = new APIKeysApi(this.apiConfig);
    this.oidcConfigsApi = new OIDCConfigsApi(this.apiConfig);
    this.smsSettingsApi = new SMSSettingsApi(this.apiConfig);
    console.log('New WireClient instance created: ', this.instanceId);
  }

  /**
   * We define a single "on" method for typed events.
   * If the event is "conversations:new" or "conversations:<id>", we auto-subscribe to WS.
   * Returns an "off()" function to unsubscribe.
   */
  public on<K extends keyof WireClientEventMap>(
    eventName: K,
    callback: (payload: WireClientEventMap[K]) => void
  ): () => void {
    // Wrap the callback for EventTarget
    const listener = (evt: Event) => {
      const customEvt = evt as CustomEvent<WireClientEventMap[K]>;
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
        // If subscription fails, you might want to:
        // 1) remove this newly added listener
        // 2) decrement the listener count back
        // 3) possibly dispatch "authentication:error" or "subscription:error"
        console.error('Subscription to', eventName, 'failed:', err);

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

  /**
   * Check if an event is a conversation-based WS event.
   * - 'conversations:new'
   * - 'conversations:<someId>'
   */
  private isWebsocketEvent(eventName: keyof WireClientEventMap | string): boolean {
    if (typeof eventName !== 'string') return false;
    return eventName.startsWith('conversations:');
  }

  /**
   * Fetch tenant config by subdomain.
   */
  public async getTenantConfigForSubdomain(subdomain: string) {
    return this.tenantConfigApi.getTenantConfig({ tenantSubdomain: subdomain });
  }

  /**
   * Fetch tenant config by tenant ID.
   */
  public async getTenantConfigForTenantId(id: string) {
    return this.tenantConfigApi.getTenantConfig({ tenantId: id });
  }

  /**
   * Sign in with email+password.
   * On success, store the access token in localStorage and re-initialize usersApi with that token.
   */
  public async signInWithEmailAndPassword(tenantId: string, email: string, password: string) {
    this.logout();

    const requestParameters = {
      emailCredentialsRequest: {
        tenantId: tenantId,
        email,
        password,
      },
    };

    const response = await this.signinApi.ropcEmailLogin(requestParameters);
    this.tokenManager.setAccessToken(response.accessToken);
    if (response.refreshToken) {
      this.tokenManager.setRefreshToken(response.refreshToken);
    }

    this.setupAfterLogin();

    return response;
  }

  /**
   * Sign in with participant client auth key
   * On success, store the access token in localStorage and re-initialize usersApi with that token.
   */
  public async signInWithParticipantAuthKey(tenantId: string, authKey: string) {
    this.logout();

    const requestParameters = {
      participantAuthKeyRequest: {
        tenantId: tenantId,
        participantAuthKey: authKey,
      },
    };

    const response = await this.signinApi.ropcParticipantAuthKeyLogin(requestParameters);
    this.tokenManager.setAccessToken(response.accessToken);
    if (response.refreshToken) {
      this.tokenManager.setRefreshToken(response.refreshToken);
    }

    this.setupAfterLogin();

    return response;
  }

  public async signInWithStoredCredentials() {
    let currentAccessToken = this.tokenManager.getAccessToken();
    let currentRefreshToken = this.tokenManager.getRefreshToken();
    this.logout();

    this.tokenManager.setAccessToken(currentAccessToken);
    this.tokenManager.setRefreshToken(currentRefreshToken);

    this.setupAfterLogin();
  }

  /**
   * Does not really sign in, just stores the token
   * // TODO: make an actual call to verify the token
   */
  public async signInWithToken(accessToken: string, refreshToken?: string) {
    this.logout();

    this.tokenManager.setAccessToken(accessToken);
    this.tokenManager.setRefreshToken(refreshToken);

    this.setupAfterLogin();

    return this;
  }

  // ----------------------------------------------------------------
  // Subscription logic used by .on() method
  // ----------------------------------------------------------------
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

  private setupAfterLogin() {
    this.setupWebsocket();
  }

  private setupWebsocket() {
    this.websocketConnection = new WireWebsocketConnection(this, this._basePath, this.tokenManager);
    this.websocketConnection.connect();
  }

  private handleTokensRefreshed() {
    console.log('Tokens refreshed');

    if (!this.isConnected()) {
      this.websocketConnection?.connect();
    }
  }

  private handleTokensCouldNotRefresh() {
    console.log('Tokens could not be refreshed');
    this.dispatchEvent(
      new CustomEvent(AUTHENTICATION_ERROR_EVENT, {
        detail: { reason: 'Could not refresh tokens' },
      })
    );
  }

  /**
   * Check if there's a current access token in localStorage.
   */
  public static get hasCredentials(): boolean {
    return TokenManager.hasAccessToken();
  }
  public get hasCredentials(): boolean {
    return this.tokenManager.hasAccessToken();
  }

  public logout(): void {
    this.websocketConnection?.disconnect();
    this.websocketConnection = undefined;
    this.tokenManager.logout();
  }

  public get basePath(): string {
    return this._basePath;
  }
}
