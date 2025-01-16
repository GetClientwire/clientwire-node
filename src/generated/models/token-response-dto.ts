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
 * @interface TokenResponseDto
 */
export interface TokenResponseDto {
    /**
     * The access token.
     * @type {string}
     * @memberof TokenResponseDto
     */
    accessToken: string;
    /**
     * The ID token (JWT).
     * @type {string}
     * @memberof TokenResponseDto
     */
    idToken?: string | null;
    /**
     * Refresh token, if available.
     * @type {string}
     * @memberof TokenResponseDto
     */
    refreshToken?: string | null;
    /**
     * Token type, typically 'Bearer'.
     * @type {string}
     * @memberof TokenResponseDto
     */
    tokenType?: string | null;
    /**
     * Seconds until expiration, e.g. 3600.
     * @type {number}
     * @memberof TokenResponseDto
     */
    expiresIn?: number | null;
}

/**
 * Check if a given object implements the TokenResponseDto interface.
 */
export function instanceOfTokenResponseDto(value: object): value is TokenResponseDto {
    if (!('accessToken' in value) || value['accessToken'] === undefined) return false;
    return true;
}

export function TokenResponseDtoFromJSON(json: any): TokenResponseDto {
    return TokenResponseDtoFromJSONTyped(json, false);
}

export function TokenResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'accessToken': json['access_token'],
        'idToken': json['id_token'] == null ? undefined : json['id_token'],
        'refreshToken': json['refresh_token'] == null ? undefined : json['refresh_token'],
        'tokenType': json['token_type'] == null ? undefined : json['token_type'],
        'expiresIn': json['expires_in'] == null ? undefined : json['expires_in'],
    };
}

export function TokenResponseDtoToJSON(json: any): TokenResponseDto {
    return TokenResponseDtoToJSONTyped(json, false);
}

export function TokenResponseDtoToJSONTyped(value?: TokenResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'access_token': value['accessToken'],
        'id_token': value['idToken'],
        'refresh_token': value['refreshToken'],
        'token_type': value['tokenType'],
        'expires_in': value['expiresIn'],
    };
}

