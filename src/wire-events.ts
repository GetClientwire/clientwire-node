import {
  WsMessageUpdated,
  WsNewConversation,
  WsConversationReadStatus,
  WsNewMessage,
  WsParticipantHadConversationOpen,
  WsParticipantReadStatus,
  WsParticipantWasTyping, WsConversationUpdated,
} from './generated/models';

export const CONNECTED_EVENT = 'connected';
export const DISCONNECTED_EVENT = 'disconnected';
export const AUTHENTICATION_ERROR_EVENT = 'authentication:error';
export const SUBSCRIPTION_ERROR_EVENT = 'subscription:error';
export const NEW_CONVERSATION_EVENT = 'conversations:new';
export const CONVERSATION_READ_STATUS_EVENT = 'conversations:read_status';
export const CONVERSATION_UPDATED_EVENT = 'conversations:updates';

type ClientWireEventMap = {
  [CONNECTED_EVENT]: void;
  [DISCONNECTED_EVENT]: void;
  [AUTHENTICATION_ERROR_EVENT]: { reason?: string };
  [NEW_CONVERSATION_EVENT]: WsNewConversation;
  [CONVERSATION_READ_STATUS_EVENT]: WsConversationReadStatus;
  [CONVERSATION_UPDATED_EVENT]: WsConversationUpdated;
} & {
  /**
   * For conversation-specific updates.
   * This uses a template-literal type to capture any string after "conversations:".
   */
  [key in `conversations:${string}`]:
    | WsNewMessage
    | WsMessageUpdated
    | WsParticipantReadStatus
    | WsParticipantWasTyping
    | WsParticipantHadConversationOpen
    | WsConversationUpdated;
};

export { ClientWireEventMap };
