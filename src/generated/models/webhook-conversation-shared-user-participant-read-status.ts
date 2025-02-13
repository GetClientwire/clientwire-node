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
/**
 * 
 * @export
 * @interface WebhookConversationSharedUserParticipantReadStatus
 */
export interface WebhookConversationSharedUserParticipantReadStatus {
    /**
     * Unique identifier for a conversation.
     * @type {string}
     * @memberof WebhookConversationSharedUserParticipantReadStatus
     */
    id: string;
    /**
     * The last seen message sequence number for all user participants in the conversation.
     * @type {number}
     * @memberof WebhookConversationSharedUserParticipantReadStatus
     */
    lastMessageSeen?: number;
    /**
     * The unread message count for all user participants in the conversation.
     * @type {number}
     * @memberof WebhookConversationSharedUserParticipantReadStatus
     */
    unreadMessageCount?: number;
}

/**
 * Check if a given object implements the WebhookConversationSharedUserParticipantReadStatus interface.
 */
export function instanceOfWebhookConversationSharedUserParticipantReadStatus(value: object): value is WebhookConversationSharedUserParticipantReadStatus {
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function WebhookConversationSharedUserParticipantReadStatusFromJSON(json: any): WebhookConversationSharedUserParticipantReadStatus {
    return WebhookConversationSharedUserParticipantReadStatusFromJSONTyped(json, false);
}

export function WebhookConversationSharedUserParticipantReadStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebhookConversationSharedUserParticipantReadStatus {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'lastMessageSeen': json['lastMessageSeen'] == null ? undefined : json['lastMessageSeen'],
        'unreadMessageCount': json['unreadMessageCount'] == null ? undefined : json['unreadMessageCount'],
    };
}

export function WebhookConversationSharedUserParticipantReadStatusToJSON(json: any): WebhookConversationSharedUserParticipantReadStatus {
    return WebhookConversationSharedUserParticipantReadStatusToJSONTyped(json, false);
}

export function WebhookConversationSharedUserParticipantReadStatusToJSONTyped(value?: WebhookConversationSharedUserParticipantReadStatus | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'lastMessageSeen': value['lastMessageSeen'],
        'unreadMessageCount': value['unreadMessageCount'],
    };
}

