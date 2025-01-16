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
 * @interface UserInfoResponse
 */
export interface UserInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    sub?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    givenName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    familyName?: string | null;
}

/**
 * Check if a given object implements the UserInfoResponse interface.
 */
export function instanceOfUserInfoResponse(value: object): value is UserInfoResponse {
    if (!('email' in value) || value['email'] === undefined) return false;
    return true;
}

export function UserInfoResponseFromJSON(json: any): UserInfoResponse {
    return UserInfoResponseFromJSONTyped(json, false);
}

export function UserInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInfoResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'email': json['email'],
        'sub': json['sub'] == null ? undefined : json['sub'],
        'givenName': json['given_name'] == null ? undefined : json['given_name'],
        'familyName': json['family_name'] == null ? undefined : json['family_name'],
    };
}

export function UserInfoResponseToJSON(json: any): UserInfoResponse {
    return UserInfoResponseToJSONTyped(json, false);
}

export function UserInfoResponseToJSONTyped(value?: UserInfoResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'email': value['email'],
        'sub': value['sub'],
        'given_name': value['givenName'],
        'family_name': value['familyName'],
    };
}

