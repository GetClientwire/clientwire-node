export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

let currentLevel: LogLevel = 'warn';

export function setLogLevel(level: LogLevel) {
  currentLevel = level;
}

/** Internal mapping from log level strings to "priority" numbers. */
function getLogPriority(level: LogLevel): number {
  switch (level) {
    case 'debug':
      return 1;
    case 'info':
      return 2;
    case 'warn':
      return 3;
    case 'error':
      return 4;
    case 'none':
      return 5;
    default:
      return 5;
  }
}

/** Used internally to determine if a message should be logged. */
function shouldLog(requested: LogLevel): boolean {
  return getLogPriority(requested) >= getLogPriority(currentLevel);
}

export function debug(...args: unknown[]): void {
  if (shouldLog('debug')) {
    console.debug('[DEBUG]', ...args);
  }
}

export function info(...args: unknown[]): void {
  if (shouldLog('info')) {
    console.info('[INFO]', ...args);
  }
}

export function warn(...args: unknown[]): void {
  if (shouldLog('warn')) {
    console.warn('[WARN]', ...args);
  }
}

export function error(...args: unknown[]): void {
  if (shouldLog('error')) {
    console.error('[ERROR]', ...args);
  }
}
