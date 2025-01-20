import { TokenManager } from './token-manager';

export function createFetchWithRefresh(
  tokenManager: TokenManager,
  tokenSuccessfullyRefreshHandler: Function | null = null,
  couldNotRefreshTokenHandler: Function | null = null
): typeof fetch {
  return async function customFetch(input, init) {
    let response = await window.fetch(input, init);

    if (response.status === 401 && !isAuthRequest(input)) {
      // Attempt refresh
      const ok = await tokenManager.refreshTokens();
      if (ok) {
        if (tokenSuccessfullyRefreshHandler) {
          tokenSuccessfullyRefreshHandler();
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

function isAuthRequest(input: RequestInfo | URL): boolean {
  const authPath = '/api/v1/auth';

  if (typeof input === 'string') {
    try {
      const url = new URL(input);
      return url.pathname.includes(authPath);
    } catch {
      return input.includes(authPath);
    }
  } else if (input instanceof URL) {
    return input.pathname.includes(authPath);
  } else if (input instanceof Request) {
    return input.url.includes(authPath);
  }

  return false;
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
