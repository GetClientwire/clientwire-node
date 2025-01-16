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
import type { TokenResponseDto } from './token-response-dto';
import {
    TokenResponseDtoFromJSON,
    TokenResponseDtoFromJSONTyped,
    TokenResponseDtoToJSON,
    TokenResponseDtoToJSONTyped,
} from './token-response-dto';

/**
 * Return a JWT token for the conversation participant and also to which tenant and conversation the participant belongs to.
 * @export
 * @interface ParticipantAuthKeyResponse
 */
export interface ParticipantAuthKeyResponse {
    /**
     * The OIDC tokens.
     * @type {TokenResponseDto}
     * @memberof ParticipantAuthKeyResponse
     */
    oidcTokens: TokenResponseDto;
    /**
     * Unique identifier for the tenant.
     * @type {string}
     * @memberof ParticipantAuthKeyResponse
     */
    tenantId: string;
}

/**
 * Check if a given object implements the ParticipantAuthKeyResponse interface.
 */
export function instanceOfParticipantAuthKeyResponse(value: object): value is ParticipantAuthKeyResponse {
    if (!('oidcTokens' in value) || value['oidcTokens'] === undefined) return false;
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    return true;
}

export function ParticipantAuthKeyResponseFromJSON(json: any): ParticipantAuthKeyResponse {
    return ParticipantAuthKeyResponseFromJSONTyped(json, false);
}

export function ParticipantAuthKeyResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParticipantAuthKeyResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'oidcTokens': TokenResponseDtoFromJSON(json['oidc_tokens']),
        'tenantId': json['tenant_id'],
    };
}

export function ParticipantAuthKeyResponseToJSON(json: any): ParticipantAuthKeyResponse {
    return ParticipantAuthKeyResponseToJSONTyped(json, false);
}

export function ParticipantAuthKeyResponseToJSONTyped(value?: ParticipantAuthKeyResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'oidc_tokens': TokenResponseDtoToJSON(value['oidcTokens']),
        'tenant_id': value['tenantId'],
    };
}

