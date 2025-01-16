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
 * @interface OidcCallbackRequest
 */
export interface OidcCallbackRequest {
    /**
     * The tenant ID.
     * @type {string}
     * @memberof OidcCallbackRequest
     */
    tenantId: string;
    /**
     * The authorization code received from Microsoft after user login.
     * @type {string}
     * @memberof OidcCallbackRequest
     */
    code: string;
    /**
     * The PKCE code verifier if you're using PKCE flow.
     * @type {string}
     * @memberof OidcCallbackRequest
     */
    codeVerifier: string;
}

/**
 * Check if a given object implements the OidcCallbackRequest interface.
 */
export function instanceOfOidcCallbackRequest(value: object): value is OidcCallbackRequest {
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    if (!('code' in value) || value['code'] === undefined) return false;
    if (!('codeVerifier' in value) || value['codeVerifier'] === undefined) return false;
    return true;
}

export function OidcCallbackRequestFromJSON(json: any): OidcCallbackRequest {
    return OidcCallbackRequestFromJSONTyped(json, false);
}

export function OidcCallbackRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): OidcCallbackRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'tenantId': json['tenant_id'],
        'code': json['code'],
        'codeVerifier': json['code_verifier'],
    };
}

export function OidcCallbackRequestToJSON(json: any): OidcCallbackRequest {
    return OidcCallbackRequestToJSONTyped(json, false);
}

export function OidcCallbackRequestToJSONTyped(value?: OidcCallbackRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'tenant_id': value['tenantId'],
        'code': value['code'],
        'code_verifier': value['codeVerifier'],
    };
}

