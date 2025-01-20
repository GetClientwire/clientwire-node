import { WsNewConversation, WsNewMessage, WsParticipantReadStatus } from './generated/models';

export const CONNECTED_EVENT = 'connected';
export const DISCONNECTED_EVENT = 'disconnected';
export const AUTHENTICATION_ERROR_EVENT = 'authentication:error';
export const SUBSCRIPTION_ERROR_EVENT = 'subscription:error';
export const NEW_CONVERSATION_EVENT = 'conversations:new';

type ClientWireEventMap = {
  [CONNECTED_EVENT]: void;
  [DISCONNECTED_EVENT]: void;
  [AUTHENTICATION_ERROR_EVENT]: { reason?: string };
  [NEW_CONVERSATION_EVENT]: WsNewConversation;
} & {
  /**
   * For conversation-specific updates. We store WsNewMessage as an example,
   * but you might have a different shape for "updates" vs. "new conversation".
   * This uses a template-literal type to capture any string after "conversations:".
   */
  [key in `conversations:${string}`]: WsNewMessage;
} & {
  /**
   * For conversation-specific updates. We store WsParticipantReadStatus as an example,
   * but you might have a different shape for "updates" vs. "new conversation".
   * This uses a template-literal type to capture any string after "conversations:".
   */
  [key in `conversations:${string}:participants:${string}:read_status`]: WsParticipantReadStatus;
};

export { ClientWireEventMap };
