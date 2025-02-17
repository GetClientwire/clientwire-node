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
 * DTO for creating or updating a Tenant OIDC configuration
 * @export
 * @interface CreateOidcConfigRequest
 */
export interface CreateOidcConfigRequest {
    /**
     * The provider name, e.g. 'microsoft' or 'google'
     * @type {string}
     * @memberof CreateOidcConfigRequest
     */
    providerName: string;
    /**
     * Authority/issuer URL, e.g. 'https://login.microsoftonline.com/<tenant>/v2.0'
     * @type {string}
     * @memberof CreateOidcConfigRequest
     */
    authorityUrl: string;
    /**
     * Client ID for this OIDC application
     * @type {string}
     * @memberof CreateOidcConfigRequest
     */
    clientId: string;
    /**
     * Client Secret in plaintext. Will be encrypted at rest.
     * @type {string}
     * @memberof CreateOidcConfigRequest
     */
    clientSecret: string;
    /**
     * Scopes to request from the OIDC provider
     * @type {string}
     * @memberof CreateOidcConfigRequest
     */
    scope?: string | null;
}

/**
 * Check if a given object implements the CreateOidcConfigRequest interface.
 */
export function instanceOfCreateOidcConfigRequest(value: object): value is CreateOidcConfigRequest {
    if (!('providerName' in value) || value['providerName'] === undefined) return false;
    if (!('authorityUrl' in value) || value['authorityUrl'] === undefined) return false;
    if (!('clientId' in value) || value['clientId'] === undefined) return false;
    if (!('clientSecret' in value) || value['clientSecret'] === undefined) return false;
    return true;
}

export function CreateOidcConfigRequestFromJSON(json: any): CreateOidcConfigRequest {
    return CreateOidcConfigRequestFromJSONTyped(json, false);
}

export function CreateOidcConfigRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateOidcConfigRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'providerName': json['provider_name'],
        'authorityUrl': json['authority_url'],
        'clientId': json['client_id'],
        'clientSecret': json['client_secret'],
        'scope': json['scope'] == null ? undefined : json['scope'],
    };
}

export function CreateOidcConfigRequestToJSON(json: any): CreateOidcConfigRequest {
    return CreateOidcConfigRequestToJSONTyped(json, false);
}

export function CreateOidcConfigRequestToJSONTyped(value?: CreateOidcConfigRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'provider_name': value['providerName'],
        'authority_url': value['authorityUrl'],
        'client_id': value['clientId'],
        'client_secret': value['clientSecret'],
        'scope': value['scope'],
    };
}

