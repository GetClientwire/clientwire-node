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
 * @interface WsConversationArchived
 */
export interface WsConversationArchived {
    /**
     * Type of the message
     * @type {string}
     * @memberof WsConversationArchived
     */
    type: string;
    /**
     * The conversation ID
     * @type {string}
     * @memberof WsConversationArchived
     */
    conversationId: string;
    /**
     * Indicates whether the conversation is archived.
     * @type {boolean}
     * @memberof WsConversationArchived
     */
    archived: boolean;
}

/**
 * Check if a given object implements the WsConversationArchived interface.
 */
export function instanceOfWsConversationArchived(value: object): value is WsConversationArchived {
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('conversationId' in value) || value['conversationId'] === undefined) return false;
    if (!('archived' in value) || value['archived'] === undefined) return false;
    return true;
}

export function WsConversationArchivedFromJSON(json: any): WsConversationArchived {
    return WsConversationArchivedFromJSONTyped(json, false);
}

export function WsConversationArchivedFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsConversationArchived {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'],
        'conversationId': json['conversation_id'],
        'archived': json['archived'],
    };
}

export function WsConversationArchivedToJSON(json: any): WsConversationArchived {
    return WsConversationArchivedToJSONTyped(json, false);
}

export function WsConversationArchivedToJSONTyped(value?: WsConversationArchived | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'conversation_id': value['conversationId'],
        'archived': value['archived'],
    };
}

