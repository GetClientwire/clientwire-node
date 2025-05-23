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
import type { MessageTemplateParameter } from './message-template-parameter';
import {
    MessageTemplateParameterFromJSON,
    MessageTemplateParameterFromJSONTyped,
    MessageTemplateParameterToJSON,
    MessageTemplateParameterToJSONTyped,
} from './message-template-parameter';
import type { MessageTemplateKind } from './message-template-kind';
import {
    MessageTemplateKindFromJSON,
    MessageTemplateKindFromJSONTyped,
    MessageTemplateKindToJSON,
    MessageTemplateKindToJSONTyped,
} from './message-template-kind';

/**
 * 
 * @export
 * @interface MessageTemplatePostRequest
 */
export interface MessageTemplatePostRequest {
    /**
     * 
     * @type {string}
     * @memberof MessageTemplatePostRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof MessageTemplatePostRequest
     */
    description?: string | null;
    /**
     * 
     * @type {MessageTemplateKind}
     * @memberof MessageTemplatePostRequest
     */
    kind: MessageTemplateKind;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof MessageTemplatePostRequest
     */
    texts: { [key: string]: string; };
    /**
     * 
     * @type {Array<MessageTemplateParameter>}
     * @memberof MessageTemplatePostRequest
     */
    parameters: Array<MessageTemplateParameter>;
}



/**
 * Check if a given object implements the MessageTemplatePostRequest interface.
 */
export function instanceOfMessageTemplatePostRequest(value: object): value is MessageTemplatePostRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('kind' in value) || value['kind'] === undefined) return false;
    if (!('texts' in value) || value['texts'] === undefined) return false;
    if (!('parameters' in value) || value['parameters'] === undefined) return false;
    return true;
}

export function MessageTemplatePostRequestFromJSON(json: any): MessageTemplatePostRequest {
    return MessageTemplatePostRequestFromJSONTyped(json, false);
}

export function MessageTemplatePostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): MessageTemplatePostRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'] == null ? undefined : json['description'],
        'kind': MessageTemplateKindFromJSON(json['kind']),
        'texts': json['texts'],
        'parameters': ((json['parameters'] as Array<any>).map(MessageTemplateParameterFromJSON)),
    };
}

export function MessageTemplatePostRequestToJSON(json: any): MessageTemplatePostRequest {
    return MessageTemplatePostRequestToJSONTyped(json, false);
}

export function MessageTemplatePostRequestToJSONTyped(value?: MessageTemplatePostRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'kind': MessageTemplateKindToJSON(value['kind']),
        'texts': value['texts'],
        'parameters': ((value['parameters'] as Array<any>).map(MessageTemplateParameterToJSON)),
    };
}

