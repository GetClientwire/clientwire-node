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
import type { ParticipantKind } from './participant-kind';
import {
    ParticipantKindFromJSON,
    ParticipantKindFromJSONTyped,
    ParticipantKindToJSON,
    ParticipantKindToJSONTyped,
} from './participant-kind';

/**
 * Represents a participant in a conversation. There are three kinds of participants: USER, CLIENT.
 * @export
 * @interface Participant
 */
export interface Participant {
    /**
     * Unique identifier for a conversation.
     * @type {string}
     * @memberof Participant
     */
    id: string;
    /**
     * Unique identifier for the tenant.
     * @type {string}
     * @memberof Participant
     */
    tenantId: string;
    /**
     * Unique identifier for a conversation.
     * @type {string}
     * @memberof Participant
     */
    conversationId: string;
    /**
     * Timestamp when the conversation was created.
     * @type {Date}
     * @memberof Participant
     */
    createdAt?: Date | null;
    /**
     * Timestamp when the conversation was last updated. Initially the same as created_at.
     * @type {Date}
     * @memberof Participant
     */
    updatedAt?: Date | null;
    /**
     * The kind of the participant.
     * @type {ParticipantKind}
     * @memberof Participant
     */
    kind: ParticipantKind;
    /**
     * The display name of the participant.
     * @type {string}
     * @memberof Participant
     */
    displayName?: string | null;
    /**
     * The preferred language of the participant.
     * @type {string}
     * @memberof Participant
     */
    preferredLanguage?: string | null;
    /**
     * The phone number of a participant if he is a CLIENT. The field is otherwise always null.
     * @type {string}
     * @memberof Participant
     */
    phoneNumber?: string | null;
    /**
     * The email of a participant if he is a CLIENT. The field is otherwise always null.
     * @type {string}
     * @memberof Participant
     */
    email?: string | null;
    /**
     * If has kind USER, this is the user id of this participant. The field is otherwise always null.
     * @type {string}
     * @memberof Participant
     */
    userId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Participant
     */
    lastMessageSequenceSeen?: number | null;
    /**
     * Number of unread messages.
     * @type {number}
     * @memberof Participant
     */
    unreadMessagesCount?: number | null;
    /**
     * The last time the participant had the conversation open.
     * @type {Date}
     * @memberof Participant
     */
    hadConversationOpenAt?: Date | null;
    /**
     * The last time the participant was seen typing.
     * @type {Date}
     * @memberof Participant
     */
    wasTypingAt?: Date | null;
}



/**
 * Check if a given object implements the Participant interface.
 */
export function instanceOfParticipant(value: object): value is Participant {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    if (!('conversationId' in value) || value['conversationId'] === undefined) return false;
    if (!('kind' in value) || value['kind'] === undefined) return false;
    return true;
}

export function ParticipantFromJSON(json: any): Participant {
    return ParticipantFromJSONTyped(json, false);
}

export function ParticipantFromJSONTyped(json: any, ignoreDiscriminator: boolean): Participant {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'tenantId': json['tenant_id'],
        'conversationId': json['conversation_id'],
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'updatedAt': json['updated_at'] == null ? undefined : (new Date(json['updated_at'])),
        'kind': ParticipantKindFromJSON(json['kind']),
        'displayName': json['display_name'] == null ? undefined : json['display_name'],
        'preferredLanguage': json['preferred_language'] == null ? undefined : json['preferred_language'],
        'phoneNumber': json['phone_number'] == null ? undefined : json['phone_number'],
        'email': json['email'] == null ? undefined : json['email'],
        'userId': json['user_id'] == null ? undefined : json['user_id'],
        'lastMessageSequenceSeen': json['last_message_sequence_seen'] == null ? undefined : json['last_message_sequence_seen'],
        'unreadMessagesCount': json['unread_messages_count'] == null ? undefined : json['unread_messages_count'],
        'hadConversationOpenAt': json['had_conversation_open_at'] == null ? undefined : (new Date(json['had_conversation_open_at'])),
        'wasTypingAt': json['was_typing_at'] == null ? undefined : (new Date(json['was_typing_at'])),
    };
}

export function ParticipantToJSON(json: any): Participant {
    return ParticipantToJSONTyped(json, false);
}

export function ParticipantToJSONTyped(value?: Participant | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'tenant_id': value['tenantId'],
        'conversation_id': value['conversationId'],
        'created_at': value['createdAt'] == null ? undefined : ((value['createdAt'] as any).toISOString()),
        'updated_at': value['updatedAt'] == null ? undefined : ((value['updatedAt'] as any).toISOString()),
        'kind': ParticipantKindToJSON(value['kind']),
        'display_name': value['displayName'],
        'preferred_language': value['preferredLanguage'],
        'phone_number': value['phoneNumber'],
        'email': value['email'],
        'user_id': value['userId'],
        'last_message_sequence_seen': value['lastMessageSequenceSeen'],
        'unread_messages_count': value['unreadMessagesCount'],
        'had_conversation_open_at': value['hadConversationOpenAt'] == null ? undefined : ((value['hadConversationOpenAt'] as any).toISOString()),
        'was_typing_at': value['wasTypingAt'] == null ? undefined : ((value['wasTypingAt'] as any).toISOString()),
    };
}

