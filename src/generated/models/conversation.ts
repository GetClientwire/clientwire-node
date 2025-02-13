/* tslint:disable */
/* eslint-disable */
/**
 * Wire API (development)
 * The API for the Clientwire messaging service.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@clientwire.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Participant } from './participant';
import {
    ParticipantFromJSON,
    ParticipantFromJSONTyped,
    ParticipantToJSON,
    ParticipantToJSONTyped,
} from './participant';
import type { CurrentUserReadStatus } from './current-user-read-status';
import {
    CurrentUserReadStatusFromJSON,
    CurrentUserReadStatusFromJSONTyped,
    CurrentUserReadStatusToJSON,
    CurrentUserReadStatusToJSONTyped,
} from './current-user-read-status';
import type { ConversationType } from './conversation-type';
import {
    ConversationTypeFromJSON,
    ConversationTypeFromJSONTyped,
    ConversationTypeToJSON,
    ConversationTypeToJSONTyped,
} from './conversation-type';

/**
 * 
 * @export
 * @interface Conversation
 */
export interface Conversation {
    /**
     * Unique identifier for a conversation.
     * @type {string}
     * @memberof Conversation
     */
    id: string;
    /**
     * Unique identifier for the tenant.
     * @type {string}
     * @memberof Conversation
     */
    tenantId: string;
    /**
     * Indicates whether the conversation is archived.
     * @type {boolean}
     * @memberof Conversation
     */
    archived: boolean;
    /**
     * Unique identifier for a conversation type.
     * @type {string}
     * @memberof Conversation
     */
    conversationTypeId: string | null;
    /**
     * The whole conversation_type type object.
     * @type {ConversationType}
     * @memberof Conversation
     */
    conversationType?: ConversationType | null;
    /**
     * Timestamp when the conversation was created.
     * @type {Date}
     * @memberof Conversation
     */
    createdAt?: Date | null;
    /**
     * Timestamp when the conversation was last updated. Initially the same as created_at.
     * @type {Date}
     * @memberof Conversation
     */
    updatedAt?: Date | null;
    /**
     * The data of a conversation corresponding to the conversation_data_schema of the conversation type.
     * @type {any}
     * @memberof Conversation
     */
    conversationData?: any | null;
    /**
     * Timestamp when the conversation data was last updated.
     * @type {Date}
     * @memberof Conversation
     */
    conversationDataUpdatedAt?: Date | null;
    /**
     * The list of participants in the conversation.
     * @type {Array<Participant>}
     * @memberof Conversation
     */
    participants?: Array<Participant> | null;
    /**
     * The read status of the current user in the conversation.
     * @type {CurrentUserReadStatus}
     * @memberof Conversation
     */
    currentUserReadStatus?: CurrentUserReadStatus | null;
}

/**
 * Check if a given object implements the Conversation interface.
 */
export function instanceOfConversation(value: object): value is Conversation {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    if (!('archived' in value) || value['archived'] === undefined) return false;
    if (!('conversationTypeId' in value) || value['conversationTypeId'] === undefined) return false;
    return true;
}

export function ConversationFromJSON(json: any): Conversation {
    return ConversationFromJSONTyped(json, false);
}

export function ConversationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Conversation {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'tenantId': json['tenant_id'],
        'archived': json['archived'],
        'conversationTypeId': json['conversation_type_id'],
        'conversationType': json['conversation_type'] == null ? undefined : ConversationTypeFromJSON(json['conversation_type']),
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'updatedAt': json['updated_at'] == null ? undefined : (new Date(json['updated_at'])),
        'conversationData': json['conversation_data'] == null ? undefined : json['conversation_data'],
        'conversationDataUpdatedAt': json['conversation_data_updated_at'] == null ? undefined : (new Date(json['conversation_data_updated_at'])),
        'participants': json['participants'] == null ? undefined : ((json['participants'] as Array<any>).map(ParticipantFromJSON)),
        'currentUserReadStatus': json['current_user_read_status'] == null ? undefined : CurrentUserReadStatusFromJSON(json['current_user_read_status']),
    };
}

export function ConversationToJSON(json: any): Conversation {
    return ConversationToJSONTyped(json, false);
}

export function ConversationToJSONTyped(value?: Conversation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'tenant_id': value['tenantId'],
        'archived': value['archived'],
        'conversation_type_id': value['conversationTypeId'],
        'conversation_type': ConversationTypeToJSON(value['conversationType']),
        'created_at': value['createdAt'] == null ? undefined : ((value['createdAt'] as any).toISOString()),
        'updated_at': value['updatedAt'] == null ? undefined : ((value['updatedAt'] as any).toISOString()),
        'conversation_data': value['conversationData'],
        'conversation_data_updated_at': value['conversationDataUpdatedAt'] == null ? undefined : ((value['conversationDataUpdatedAt'] as any).toISOString()),
        'participants': value['participants'] == null ? undefined : ((value['participants'] as Array<any>).map(ParticipantToJSON)),
        'current_user_read_status': CurrentUserReadStatusToJSON(value['currentUserReadStatus']),
    };
}

