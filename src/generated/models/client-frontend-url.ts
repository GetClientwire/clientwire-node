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
 * @interface ClientFrontendUrl
 */
export interface ClientFrontendUrl {
    /**
     * The if of the client participant.
     * @type {string}
     * @memberof ClientFrontendUrl
     */
    clientId: string;
    /**
     * The url for the client to access the frontend.
     * @type {string}
     * @memberof ClientFrontendUrl
     */
    url: string | null;
}

/**
 * Check if a given object implements the ClientFrontendUrl interface.
 */
export function instanceOfClientFrontendUrl(value: object): value is ClientFrontendUrl {
    if (!('clientId' in value) || value['clientId'] === undefined) return false;
    if (!('url' in value) || value['url'] === undefined) return false;
    return true;
}

export function ClientFrontendUrlFromJSON(json: any): ClientFrontendUrl {
    return ClientFrontendUrlFromJSONTyped(json, false);
}

export function ClientFrontendUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClientFrontendUrl {
    if (json == null) {
        return json;
    }
    return {
        
        'clientId': json['client_id'],
        'url': json['url'],
    };
}

export function ClientFrontendUrlToJSON(json: any): ClientFrontendUrl {
    return ClientFrontendUrlToJSONTyped(json, false);
}

export function ClientFrontendUrlToJSONTyped(value?: ClientFrontendUrl | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'client_id': value['clientId'],
        'url': value['url'],
    };
}

