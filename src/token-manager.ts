import * as logger from './logger';

export class TokenManager {
  private static TENANT_ID = 'wire.tenant_id';
  private static ACCESS_TOKEN_KEY = 'wire.access_token';
  private static REFRESH_TOKEN_KEY = 'wire.refresh_token';

  private refreshCallback?: () => Promise<boolean>;
  private refreshInProgress?: Promise<boolean>;

  public setRefreshCallback(callback: () => Promise<boolean>) {
    logger.debug('[ClientWireApi.TokenManager] refresh callback set');
    this.refreshCallback = callback;
  }

  public clearRefreshCallback() {
    this.refreshCallback = undefined;
  }

  public clearTokens() {
    localStorage.removeItem(TokenManager.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY);
  }

  public getAccessToken(): string | undefined {
    return localStorage.getItem(TokenManager.ACCESS_TOKEN_KEY) || undefined;
  }

  public getRefreshToken(): string | undefined {
    return localStorage.getItem(TokenManager.REFRESH_TOKEN_KEY) || undefined;
  }

  public getTenantId(): string | undefined {
    return localStorage.getItem(TokenManager.TENANT_ID) || undefined;
  }

  public setTokens(tenantId: string, accessToken: string, refreshToken: string | undefined | null) {
    localStorage.setItem(TokenManager.TENANT_ID, tenantId);
    localStorage.setItem(TokenManager.ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) {
      localStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY);
    }
  }

  /**
   * The main method to refresh tokens.
   */
  public async refreshTokens(): Promise<boolean> {
    if (this.refreshInProgress) {
      return this.refreshInProgress;
    }
    this.refreshInProgress = this.doActualRefresh().finally(() => {
      this.refreshInProgress = undefined;
    });
    return this.refreshInProgress;
  }

  private async doActualRefresh(): Promise<boolean> {
    if (!this.refreshCallback) {
      logger.debug('[ClientWireApi.TokenManager] No refresh callback set');
      return false;
    }

    try {
      const refreshCallbackResult = await this.refreshCallback();

      if (refreshCallbackResult) {
        logger.debug(
          '[ClientWireApi.TokenManager] refreshCallback reports success; new tokens should now be set'
        );
        return true;
      } else {
        logger.warn('[ClientWireApi.TokenManager] refreshCallback reports failure');
        return false;
      }
    } catch (err) {
      logger.warn('[ClientWireApi.TokenManager] Error executing refreshCallback:', err);
      return false;
    }
  }

  public hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  public static hasAccessToken(): boolean {
    return !!(localStorage.getItem(TokenManager.ACCESS_TOKEN_KEY) || undefined);
  }
}
