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
import type { ApiKeyListItem } from './api-key-list-item';
import {
    ApiKeyListItemFromJSON,
    ApiKeyListItemFromJSONTyped,
    ApiKeyListItemToJSON,
    ApiKeyListItemToJSONTyped,
} from './api-key-list-item';

/**
 * Wrapper object for returning a list of API keys.
 * @export
 * @interface ApiKeyList
 */
export interface ApiKeyList {
    /**
     * List of API keys for this tenant.
     * @type {Array<ApiKeyListItem>}
     * @memberof ApiKeyList
     */
    apiKeys: Array<ApiKeyListItem>;
}

/**
 * Check if a given object implements the ApiKeyList interface.
 */
export function instanceOfApiKeyList(value: object): value is ApiKeyList {
    if (!('apiKeys' in value) || value['apiKeys'] === undefined) return false;
    return true;
}

export function ApiKeyListFromJSON(json: any): ApiKeyList {
    return ApiKeyListFromJSONTyped(json, false);
}

export function ApiKeyListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiKeyList {
    if (json == null) {
        return json;
    }
    return {
        
        'apiKeys': ((json['api_keys'] as Array<any>).map(ApiKeyListItemFromJSON)),
    };
}

export function ApiKeyListToJSON(json: any): ApiKeyList {
    return ApiKeyListToJSONTyped(json, false);
}

export function ApiKeyListToJSONTyped(value?: ApiKeyList | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'api_keys': ((value['apiKeys'] as Array<any>).map(ApiKeyListItemToJSON)),
    };
}

