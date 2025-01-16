import { TokenManager } from './token-manager';

export function createFetchWithRefresh(
  tokenManager: TokenManager,
  tokenRerefreshHandler: Function | null = null,
  couldNotRefreshTokenHandler: Function | null = null
): typeof fetch {
  return async function customFetch(input, init) {
    let response = await window.fetch(input, init);

    if (response.status === 401) {
      // Attempt refresh
      const ok = await tokenManager.refreshTokens();
      if (ok) {
        if (tokenRerefreshHandler) {
          tokenRerefreshHandler();
        }
        const newInit = cloneRequestInit(init, tokenManager.getAccessToken());
        return window.fetch(input, newInit);
      } else {
        if (couldNotRefreshTokenHandler) {
          couldNotRefreshTokenHandler();
        }
      }
    }

    return response;
  };
}

function cloneRequestInit(
  init: RequestInit | undefined,
  newAccessToken: string | undefined
): RequestInit {
  const newInit = { ...(init || {}) };
  const newHeaders = new Headers(newInit.headers || {});
  if (newAccessToken) {
    newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
  }
  newInit.headers = newHeaders;
  return newInit;
}
