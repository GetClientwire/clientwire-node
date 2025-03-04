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
 * @interface WebhookConversation
 */
export interface WebhookConversation {
    /**
     * Unique identifier for a conversation.
     * @type {string}
     * @memberof WebhookConversation
     */
    id: string;
    /**
     * Indicates whether the conversation is archived.
     * @type {boolean}
     * @memberof WebhookConversation
     */
    archived: boolean;
    /**
     * Unique identifier for a conversation type.
     * @type {string}
     * @memberof WebhookConversation
     */
    conversationTypeId: string | null;
}

/**
 * Check if a given object implements the WebhookConversation interface.
 */
export function instanceOfWebhookConversation(value: object): value is WebhookConversation {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('archived' in value) || value['archived'] === undefined) return false;
    if (!('conversationTypeId' in value) || value['conversationTypeId'] === undefined) return false;
    return true;
}

export function WebhookConversationFromJSON(json: any): WebhookConversation {
    return WebhookConversationFromJSONTyped(json, false);
}

export function WebhookConversationFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebhookConversation {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'archived': json['archived'],
        'conversationTypeId': json['conversation_type_id'],
    };
}

export function WebhookConversationToJSON(json: any): WebhookConversation {
    return WebhookConversationToJSONTyped(json, false);
}

export function WebhookConversationToJSONTyped(value?: WebhookConversation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'archived': value['archived'],
        'conversation_type_id': value['conversationTypeId'],
    };
}

