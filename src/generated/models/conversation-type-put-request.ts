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
 * @interface ConversationTypePutRequest
 */
export interface ConversationTypePutRequest {
    /**
     * Unique identifier for a conversation type.
     * @type {string}
     * @memberof ConversationTypePutRequest
     */
    id?: string | null;
    /**
     * A description of what this conversation type is used for.
     * @type {string}
     * @memberof ConversationTypePutRequest
     */
    description?: string | null;
    /**
     * If set, all user participants will appear as the same user in the conversation to client participants.
     * @type {string}
     * @memberof ConversationTypePutRequest
     */
    displayNameSharedByUsers?: string | null;
    /**
     * A JSON Schema describing the data expected in the conversation.
     * @type {any}
     * @memberof ConversationTypePutRequest
     */
    conversationDataSchema?: any | null;
    /**
     * A handlebars template string used to render the conversation data in a list view. The template can contain placeholders for data in the conversation data schema.
     * @type {string}
     * @memberof ConversationTypePutRequest
     */
    conversationDataListItemTemplate?: string | null;
    /**
     * An HTML template to reader the header in the client app which has dynamic values based on the conversation_data
     * @type {string}
     * @memberof ConversationTypePutRequest
     */
    clientAppHeaderTemplate?: string | null;
}

/**
 * Check if a given object implements the ConversationTypePutRequest interface.
 */
export function instanceOfConversationTypePutRequest(value: object): value is ConversationTypePutRequest {
    return true;
}

export function ConversationTypePutRequestFromJSON(json: any): ConversationTypePutRequest {
    return ConversationTypePutRequestFromJSONTyped(json, false);
}

export function ConversationTypePutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConversationTypePutRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'description': json['description'] == null ? undefined : json['description'],
        'displayNameSharedByUsers': json['displayNameSharedByUsers'] == null ? undefined : json['displayNameSharedByUsers'],
        'conversationDataSchema': json['conversation_data_schema'] == null ? undefined : json['conversation_data_schema'],
        'conversationDataListItemTemplate': json['conversation_data_list_item_template'] == null ? undefined : json['conversation_data_list_item_template'],
        'clientAppHeaderTemplate': json['client_app_header_template'] == null ? undefined : json['client_app_header_template'],
    };
}

export function ConversationTypePutRequestToJSON(json: any): ConversationTypePutRequest {
    return ConversationTypePutRequestToJSONTyped(json, false);
}

export function ConversationTypePutRequestToJSONTyped(value?: ConversationTypePutRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'description': value['description'],
        'displayNameSharedByUsers': value['displayNameSharedByUsers'],
        'conversation_data_schema': value['conversationDataSchema'],
        'conversation_data_list_item_template': value['conversationDataListItemTemplate'],
        'client_app_header_template': value['clientAppHeaderTemplate'],
    };
}

