export class TokenManager {
  private static ACCESS_TOKEN_KEY = 'wire.access_token';
  private static REFRESH_TOKEN_KEY = 'wire.refresh_token';

  private refreshInProgress?: Promise<boolean>;
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public getAccessToken(): string | undefined {
    return localStorage.getItem(TokenManager.ACCESS_TOKEN_KEY) || undefined;
  }

  public setAccessToken(token: string | undefined) {
    if (token) {
      localStorage.setItem(TokenManager.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TokenManager.ACCESS_TOKEN_KEY);
    }
  }

  public getRefreshToken(): string | undefined {
    return localStorage.getItem(TokenManager.REFRESH_TOKEN_KEY) || undefined;
  }

  public setRefreshToken(token: string | undefined) {
    if (token) {
      localStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, token);
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
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('[TokenManager] No refresh token available.');
      return false;
    }

    try {
      // Call your refresh endpoint. Example: /oauth2/token
      const resp = await fetch(`${this.basePath}/api/v1/signin/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });

      if (!resp.ok) {
        console.error('[TokenManager] refresh call failed. status=', resp.status);
        return false;
      }

      const data = await resp.json();
      // e.g. { access_token, refresh_token, token_type, expires_in }

      if (!data.access_token) {
        console.error('[TokenManager] refresh: no access_token returned');
        return false;
      }

      // Store new tokens
      this.setAccessToken(data.access_token);
      if (data.refresh_token) {
        this.setRefreshToken(data.refresh_token);
      }

      console.log('[TokenManager] Token refreshed successfully');
      return true;
    } catch (err) {
      console.error('[TokenManager] Error refreshing token:', err);
      return false;
    }
  }

  /**
   * If needed, handle a "logout" scenario to remove tokens.
   */
  public logout() {
    this.setAccessToken(undefined);
    this.setRefreshToken(undefined);
  }

  /**
   * Quick check if we have an access token
   */
  public hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Quick static check if we have an access token
   */
  public static hasAccessToken(): boolean {
    return !!(localStorage.getItem(TokenManager.ACCESS_TOKEN_KEY) || undefined);
  }
}
