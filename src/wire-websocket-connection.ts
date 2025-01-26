import {
  WsPong,
  WsSubscribe,
  WsUnsubscribe,
  WsNewMessageFromJSON,
  WsNewConversationFromJSON,
  WsMessageUpdatedFromJSON,
  WsParticipantReadStatusFromJSON,
} from './generated/models';
import { TokenManager } from './token-manager';
import * as logger from './logger';

export class WireWebsocketConnection {
  private client: EventTarget;
  private basePath: string;
  private tokenManager: TokenManager;

  private socket: WebSocket | null = null;

  private connected = false;
  private shouldReconnect = false; // if true, auto-reconnect on close/error
  private reconnectDelay = 3000; // 3 seconds
  private reconnectTimer: number | null = null;

  private pingInterval: number = 10000; // 10 seconds
  private pongTimeout: number = 5000; // 5 seconds
  private pingTimer: number | null = null;
  private pongTimeoutTimer: number | null = null;

  private activeSubscriptions: Set<string> = new Set();

  /**
   * 1) We track a queue of messages we want to send, but which
   *    cannot be sent yet (either the socket is not open, or
   *    we haven't sent "AUTHENTICATE" yet).
   */
  private messageQueue: object[] = [];

  /**
   * 2) A flag to ensure our first message is always AUTHENTICATE.
   */
  private authSent = false;

  constructor(eventEmitter: EventTarget, basePath: string, tokenManager: TokenManager) {
    this.tokenManager = tokenManager;
    this.client = eventEmitter;
    this.basePath = basePath;
  }

  public get isConnected(): boolean {
    return this.connected;
  }

  public connect(): void {
    this.shouldReconnect = true;

    // Reset authSent every time we start a fresh connection
    this.authSent = false;

    if (!window.WebSocket) {
      logger.error('[ClientWireApi.Websocket] Browser does not support WebSocket.');
      return;
    }

    // Guard to prevent multiple parallel connections
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    ) {
      logger.debug('[ClientWireApi.Websocket] Already open or connecting.');
      return;
    }

    this.socket = new WebSocket(this.wsUrl());

    this.socket.onopen = this.wsOnOpen.bind(this);
    this.socket.onclose = this.wsOnClose.bind(this);
    this.socket.onmessage = this.wsOnMessage.bind(this);
    this.socket.onerror = this.wsOnError.bind(this);
  }

  public disconnect(): void {
    this.shouldReconnect = false;
    this.stopPing();
    if (
      this.socket &&
      this.socket.readyState !== WebSocket.CLOSED &&
      this.socket.readyState !== WebSocket.CLOSING
    ) {
      try {
        this.socket.close();
      } catch (error) {
        logger.warn('[ClientWireApi.Websocket] Failed to close WebSocket:', error);
      }
    }
    this.socket = null;
  }

  /**
   * Use the message queue to ensure messages only go out if socket is open
   * AND we have sent the AUTHENTICATE message first.
   */
  private sendMessage(msg: object) {
    if (!this.socket) {
      // No socket yet, queue
      this.messageQueue.push(msg);
      return;
    }
    // If socket is open AND we've sent "AUTHENTICATE"
    if (this.socket.readyState === WebSocket.OPEN && this.authSent) {
      this.socket.send(JSON.stringify(msg));
    } else {
      // Otherwise, queue for later
      this.messageQueue.push(msg);
    }
  }

  /**
   * Flush all queued messages in FIFO order, but only if
   * the socket is OPEN and the AUTHENTICATE message was sent.
   */
  private flushQueue() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN || !this.authSent) {
      return; // not ready yet
    }
    while (this.messageQueue.length > 0) {
      const msg = this.messageQueue.shift();
      this.socket.send(JSON.stringify(msg));
    }
  }

  /**
   * Subscribe and unsubscribe now just queue the messages if needed.
   * This ensures we never send SUBSCRIBE before AUTHENTICATE.
   */
  public subscribe(address: string): void {
    this.activeSubscriptions.add(address);
    const message: WsSubscribe = { type: 'SUBSCRIBE', address };
    this.sendMessage(message);
  }

  public unsubscribe(address: string): void {
    this.activeSubscriptions.delete(address);
    const message: WsUnsubscribe = { type: 'UNSUBSCRIBE', address };
    this.sendMessage(message);
  }

  public unsubscribeAll(): void {
    this.activeSubscriptions.forEach((address) => {
      this.activeSubscriptions.delete(address);
      const message: WsUnsubscribe = { type: 'UNSUBSCRIBE', address };
      this.sendMessage(message);
    });
  }

  // Resubscribe might send SUBSCRIBE messages for addresses that are already subscribed
  // but that's fine, the server will just ignore them.
  private resubscribe(): void {
    this.activeSubscriptions.forEach((address) => {
      const msg: WsSubscribe = { type: 'SUBSCRIBE', address };
      this.sendMessage(msg);
    });
  }

  private wsUrl(): string {
    return `${this.basePath}/api/v1/ws/conversations`;
  }

  private wsOnOpen(event: Event): void {
    logger.debug('[ClientWireApi.Websocket] WebSocket connected');

    // Clear any existing reconnect timer
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Mark the connection as "connected" if it wasn't before
    if (!this.connected) {
      this.connected = true;
      this.client.dispatchEvent(new CustomEvent('connected'));
    }

    // 3) The first message MUST be AUTHENTICATE
    // If the socket is indeed OPEN, send it immediately.
    if (this.socket?.readyState === WebSocket.OPEN) {
      const authPayload = {
        type: 'AUTHENTICATE',
        token: this.tokenManager.getAccessToken(),
      };
      this.socket.send(JSON.stringify(authPayload));
      this.authSent = true;
    } else {
      // Fallback: if for some reason it's not open yet, wait a tick
      setTimeout(() => {
        if (this.socket?.readyState === WebSocket.OPEN) {
          const authPayload = {
            type: 'AUTHENTICATE',
            token: this.tokenManager.getAccessToken(),
          };
          this.socket.send(JSON.stringify(authPayload));
          this.authSent = true;
          // Then flush below
          this.flushQueue();
        }
      }, 0);
    }

    // Now that we have (or will have) authenticated,
    // we can safely flush queued messages.
    // (If we did a synchronous send, "authSent" is already true here.)
    this.flushQueue();

    this.startPing();
    this.resubscribe(); // Re-queue the SUBSCRIBE messages for any known addresses
  }

  private wsOnClose(event: CloseEvent): void {
    logger.debug('[ClientWireApi.Websocket] WebSocket closed', event);

    // Only emit "disconnected" if we were previously connected
    if (this.connected) {
      this.connected = false;
      this.client.dispatchEvent(new CustomEvent('disconnected'));
    }

    // Once closed, reset authSent so next connect re-authenticates
    this.authSent = false;

    this.stopPing();

    // If the server closed us with 1008 => we suspect an auth problem
    if (event.code === 1008) {
      logger.info('[ClientWireApi.Websocket] WebSocket closed due to policy violation (code 1008)');
      this.handleAuthExpired();
    }

    this.socket = null;

    if (this.shouldReconnect) {
      this.wsScheduleReconnect();
    }
  }

  private wsOnMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'PING': {
          const message: WsPong = { type: 'PONG' };
          this.sendMessage(message);
          break;
        }
        case 'PONG': {
          this.clearPongTimeout();
          break;
        }
        case 'NEW_CONVERSATION': {
          logger.debug('[ClientWireApi.Websocket] Received NEW_CONVERSATION:', data);
          const message = WsNewConversationFromJSON(data);
          this.client.dispatchEvent(new CustomEvent('conversations:new', { detail: message }));
          break;
        }
        case 'NEW_MESSAGE': {
          logger.debug('[ClientWireApi.Websocket] Received NEW_MESSAGE:', data);
          const eventName = `conversations:${data.message.conversation_id}`;
          const message = WsNewMessageFromJSON(data);
          this.client.dispatchEvent(new CustomEvent(eventName, { detail: message }));
          break;
        }
        case 'MESSAGE_UPDATED': {
          logger.debug('[ClientWireApi.Websocket] Received MESSAGE_UPDATED:', data);
          const eventName = `conversations:${data.message.conversation_id}`;
          const message = WsMessageUpdatedFromJSON(data);
          this.client.dispatchEvent(new CustomEvent(eventName, { detail: message }));
          break;
        }
        case 'PARTICIPANT_READ_STATUS': {
          logger.debug('[ClientWireApi.Websocket] Received PARTICIPANT_READ_STATUS:', data);
          const eventName = `conversation:${data.message.conversation_id}:participant:${data.message.participant_id}`;
          const message = WsParticipantReadStatusFromJSON(data);
          this.client.dispatchEvent(new CustomEvent(eventName, { detail: message }));
          break;
        }
        default:
          logger.debug('[ClientWireApi.Websocket] Unknown message type:', data);
      }
    } catch (err) {
      logger.debug('[ClientWireApi.Websocket] Failed to parse WebSocket message:', err);
    }
  }

  private wsOnError(error: Event): void {
    logger.debug('[ClientWireApi.Websocket] WebSocket error', error);

    // Only emit "disconnected" if we were previously connected
    if (this.connected) {
      this.connected = false;
      this.client.dispatchEvent(new CustomEvent('disconnected'));
    }

    if (this.shouldReconnect) {
      this.wsScheduleReconnect();
    }
  }

  private wsScheduleReconnect(): void {
    if (this.reconnectTimer !== null) {
      // already scheduled
      return;
    }
    logger.info(
      `[ClientWireApi.Websocket] Scheduling websocket reconnect in ${this.reconnectDelay} ms...`
    );
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, this.reconnectDelay);
  }

  private async handleAuthExpired() {
    logger.debug('[ClientWireApi.Websocket] Auth expired => attempting refresh...');
    const ok = await this.tokenManager.refreshTokens();
    if (!ok) {
      this.shouldReconnect = false;
      logger.debug('[ClientWireApi.Websocket] Refresh failed, stopping reconnect attempts');
    } else {
      logger.debug('[ClientWireApi.Websocket] Refresh succeeded');
    }
  }

  private startPing(): void {
    this.stopPing(); // Ensure no duplicate timers
    this.pingTimer = window.setInterval(() => this.sendPing(), this.pingInterval);
  }

  private sendPing(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.sendMessage({ type: 'PING' });
      this.startPongTimeout();
    }
  }

  private startPongTimeout(): void {
    this.clearPongTimeout();
    this.pongTimeoutTimer = window.setTimeout(() => {
      logger.debug('[ClientWireApi.Websocket] Pong timeout - no response from server.');
      this.socket?.close(); // Force a reconnection
    }, this.pongTimeout);
  }

  private clearPongTimeout(): void {
    if (this.pongTimeoutTimer !== null) {
      clearTimeout(this.pongTimeoutTimer);
      this.pongTimeoutTimer = null;
    }
  }

  private stopPing(): void {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    this.clearPongTimeout();
  }
}
