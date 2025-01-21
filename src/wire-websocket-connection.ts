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

  // WebSocket or null if not yet connected
  private socket: WebSocket | null = null;

  private connected = false;
  private shouldReconnect = false; // if true, auto-reconnect on close/error
  private reconnectDelay = 3000; // 3 seconds
  private reconnectTimer: number | null = null;

  private pingInterval: number = 10000; // 10 seconds
  private pongTimeout: number = 5000; // 5 seconds
  private pingTimer: number | null = null;
  private pongTimeoutTimer: number | null = null;

  private activeSubscriptions: Set<string> = new Set(); // Track subscriptions

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
    if (!window.WebSocket) {
      logger.error('[ClientWireApi.Websocket] Browser does not support WebSocket.');
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
    if (this.socket && !this.socket.CLOSED && !this.socket.CLOSING) {
      try {
        this.socket.close();
      } catch (error) {
        logger.warn('[ClientWireApi.Websocket] Failed to close WebSocket:', error);
      }
    }
  }

  public subscribe(address: string): void {
    this.activeSubscriptions.add(address); // Track the subscription
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      let message = { type: 'SUBSCRIBE', address: address } as WsSubscribe;
      this.socket.send(JSON.stringify(message));
    }
  }

  public unsubscribe(address: string): void {
    this.activeSubscriptions.delete(address); // Remove from the tracked subscriptions
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      let message = { type: 'UNSUBSCRIBE', address: address } as WsUnsubscribe;
      this.socket.send(JSON.stringify(message));
    }
  }

  public unsubscribeAll(): void {
    this.activeSubscriptions.forEach((address) => {
      this.activeSubscriptions.delete(address);
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        let message = { type: 'UNSUBSCRIBE', address: address } as WsUnsubscribe;
        this.socket.send(JSON.stringify(message));
      }
    });
  }

  private wsUrl(): string {
    return `${this.basePath}/api/v1/ws/conversations`;
  }

  private wsOnOpen(event: Event): void {
    logger.debug('[ClientWireApi.Websocket] WebSocket connected');

    // Only emit "connected" if we were previously disconnected
    if (!this.connected) {
      this.connected = true;

      // Send token for server-side auth
      this.socket!.send(
        JSON.stringify({
          type: 'AUTHENTICATE',
          token: this.tokenManager.getAccessToken(),
        })
      );

      this.client.dispatchEvent(new CustomEvent('connected'));
    }

    // Clear any existing reconnect timer
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.startPing();
    this.resubscribe(); // Resubscribe to all tracked subscriptions
  }

  private wsOnClose(event: CloseEvent): void {
    logger.debug('[ClientWireApi.Websocket] WebSocket closed', event);

    // Only emit "disconnected" if we were previously connected
    if (this.connected) {
      this.connected = false;
      this.client.dispatchEvent(new CustomEvent('disconnected'));
    }

    this.stopPing();

    if ((event as CloseEvent).code === 1008) {
      logger.info('[ClientWireApi.Websocket] WebSocket closed due to policy violation (code 1008)');
      this.handleAuthExpired();
    }

    if (this.shouldReconnect) {
      this.wsScheduleReconnect();
    }
  }

  private resubscribe(): void {
    this.activeSubscriptions.forEach((address) => {
      this.subscribe(address);
    });
  }

  private wsOnMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'PING': {
          let message = { type: 'PONG' } as WsPong;
          this.socket?.send(JSON.stringify(message));
          break;
        }
        case 'PONG': {
          this.clearPongTimeout();
          break;
        }

        case 'NEW_CONVERSATION': {
          logger.debug('[ClientWireApi.Websocket] Received new NEW_CONVERSATION:', data);
          let message = WsNewConversationFromJSON(data);
          this.client.dispatchEvent(new CustomEvent('conversations:new', { detail: message }));
          break;
        }
        case 'NEW_MESSAGE': {
          logger.debug('[ClientWireApi.Websocket] Received new NEW_MESSAGE:', data);
          let eventName = `conversations:${data.message.conversation_id}`;
          let message = WsNewMessageFromJSON(data);
          this.client.dispatchEvent(new CustomEvent(eventName, { detail: message }));
          break;
        }
        case 'MESSAGE_UPDATED': {
          logger.debug('[ClientWireApi.Websocket] Received new MESSAGE_UPDATED:', data);
          let eventName = `conversations:${data.message.conversation_id}`;
          let message = WsMessageUpdatedFromJSON(data);
          this.client.dispatchEvent(new CustomEvent(eventName, { detail: message }));
          break;
        }

        case 'PARTICIPANT_READ_STATUS': {
          logger.debug('[ClientWireApi.Websocket] Received new PARTICIPANT_READ_STATUS:', data);
          let eventName = `conversation:${data.message.conversation_id}:participant:${data.message.participant_id}`;
          let message = WsParticipantReadStatusFromJSON(data);
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
    this.socket?.close();
    logger.debug('[ClientWireApi.Websocket] Auth expired => attempting refresh...');
    const ok = await this.tokenManager.refreshTokens();
    if (!ok) {
      logger.debug('[ClientWireApi.Websocket] Refresh failed => disconnect + forced logout?');
    } else {
      logger.debug('[ClientWireApi.Websocket] Refresh succeeded => re-auth websocket?');
    }
  }

  private startPing(): void {
    this.stopPing(); // Ensure no duplicate timers
    this.pingTimer = window.setInterval(() => this.sendPing(), this.pingInterval);
  }

  private sendPing(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'PING' }));
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
