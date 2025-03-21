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
import type { Conversation } from './conversation';
import {
    ConversationFromJSON,
    ConversationFromJSONTyped,
    ConversationToJSON,
    ConversationToJSONTyped,
} from './conversation';

/**
 * 
 * @export
 * @interface ConversationListResponse
 */
export interface ConversationListResponse {
    /**
     * 
     * @type {Array<Conversation>}
     * @memberof ConversationListResponse
     */
    conversations?: Array<Conversation> | null;
}

/**
 * Check if a given object implements the ConversationListResponse interface.
 */
export function instanceOfConversationListResponse(value: object): value is ConversationListResponse {
    return true;
}

export function ConversationListResponseFromJSON(json: any): ConversationListResponse {
    return ConversationListResponseFromJSONTyped(json, false);
}

export function ConversationListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConversationListResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'conversations': json['conversations'] == null ? undefined : ((json['conversations'] as Array<any>).map(ConversationFromJSON)),
    };
}

export function ConversationListResponseToJSON(json: any): ConversationListResponse {
    return ConversationListResponseToJSONTyped(json, false);
}

export function ConversationListResponseToJSONTyped(value?: ConversationListResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'conversations': value['conversations'] == null ? undefined : ((value['conversations'] as Array<any>).map(ConversationToJSON)),
    };
}

