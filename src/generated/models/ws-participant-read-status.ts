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
 * @interface WsParticipantReadStatus
 */
export interface WsParticipantReadStatus {
    /**
     * 
     * @type {string}
     * @memberof WsParticipantReadStatus
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WsParticipantReadStatus
     */
    participantId: string;
    /**
     * 
     * @type {string}
     * @memberof WsParticipantReadStatus
     */
    conversationId: string;
    /**
     * 
     * @type {number}
     * @memberof WsParticipantReadStatus
     */
    unreadMessages?: number;
}

/**
 * Check if a given object implements the WsParticipantReadStatus interface.
 */
export function instanceOfWsParticipantReadStatus(value: object): value is WsParticipantReadStatus {
    if (!('participantId' in value) || value['participantId'] === undefined) return false;
    if (!('conversationId' in value) || value['conversationId'] === undefined) return false;
    return true;
}

export function WsParticipantReadStatusFromJSON(json: any): WsParticipantReadStatus {
    return WsParticipantReadStatusFromJSONTyped(json, false);
}

export function WsParticipantReadStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsParticipantReadStatus {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'participantId': json['participant_id'],
        'conversationId': json['conversation_id'],
        'unreadMessages': json['unread_messages'] == null ? undefined : json['unread_messages'],
    };
}

export function WsParticipantReadStatusToJSON(json: any): WsParticipantReadStatus {
    return WsParticipantReadStatusToJSONTyped(json, false);
}

export function WsParticipantReadStatusToJSONTyped(value?: WsParticipantReadStatus | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'participant_id': value['participantId'],
        'conversation_id': value['conversationId'],
        'unread_messages': value['unreadMessages'],
    };
}

