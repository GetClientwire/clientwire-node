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
 * @interface WsNewConversation
 */
export interface WsNewConversation {
    /**
     * 
     * @type {string}
     * @memberof WsNewConversation
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WsNewConversation
     */
    conversationPublicId: string;
}

/**
 * Check if a given object implements the WsNewConversation interface.
 */
export function instanceOfWsNewConversation(value: object): value is WsNewConversation {
    if (!('conversationPublicId' in value) || value['conversationPublicId'] === undefined) return false;
    return true;
}

export function WsNewConversationFromJSON(json: any): WsNewConversation {
    return WsNewConversationFromJSONTyped(json, false);
}

export function WsNewConversationFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsNewConversation {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'conversationPublicId': json['conversationPublicId'],
    };
}

export function WsNewConversationToJSON(json: any): WsNewConversation {
    return WsNewConversationToJSONTyped(json, false);
}

export function WsNewConversationToJSONTyped(value?: WsNewConversation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'conversationPublicId': value['conversationPublicId'],
    };
}

