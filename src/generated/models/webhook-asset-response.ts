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
import type { Status } from './status';
import {
    StatusFromJSON,
    StatusFromJSONTyped,
    StatusToJSON,
    StatusToJSONTyped,
} from './status';

/**
 * 
 * @export
 * @interface WebhookAssetResponse
 */
export interface WebhookAssetResponse {
    /**
     * URL to download the created asset
     * @type {string}
     * @memberof WebhookAssetResponse
     */
    downloadUrl?: string | null;
    /**
     * URL to upload a asset
     * @type {string}
     * @memberof WebhookAssetResponse
     */
    uploadUrl?: string | null;
    /**
     * The status of the asset.
     * @type {Status}
     * @memberof WebhookAssetResponse
     */
    status?: Status | null;
}



/**
 * Check if a given object implements the WebhookAssetResponse interface.
 */
export function instanceOfWebhookAssetResponse(value: object): value is WebhookAssetResponse {
    return true;
}

export function WebhookAssetResponseFromJSON(json: any): WebhookAssetResponse {
    return WebhookAssetResponseFromJSONTyped(json, false);
}

export function WebhookAssetResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebhookAssetResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'downloadUrl': json['download_url'] == null ? undefined : json['download_url'],
        'uploadUrl': json['upload_url'] == null ? undefined : json['upload_url'],
        'status': json['status'] == null ? undefined : StatusFromJSON(json['status']),
    };
}

export function WebhookAssetResponseToJSON(json: any): WebhookAssetResponse {
    return WebhookAssetResponseToJSONTyped(json, false);
}

export function WebhookAssetResponseToJSONTyped(value?: WebhookAssetResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'download_url': value['downloadUrl'],
        'upload_url': value['uploadUrl'],
        'status': StatusToJSON(value['status']),
    };
}

