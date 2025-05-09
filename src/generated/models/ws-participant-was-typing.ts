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
 * @interface WsParticipantWasTyping
 */
export interface WsParticipantWasTyping {
    /**
     * Type of the message
     * @type {string}
     * @memberof WsParticipantWasTyping
     */
    type?: string | null;
    /**
     * Participant ID
     * @type {string}
     * @memberof WsParticipantWasTyping
     */
    participantId: string;
    /**
     * Conversation ID
     * @type {string}
     * @memberof WsParticipantWasTyping
     */
    conversationId: string;
    /**
     * The participant has been typing at this time
     * @type {Date}
     * @memberof WsParticipantWasTyping
     */
    wasTypingAt: Date;
    /**
     * The participant has been typing for this message_source_id
     * @type {string}
     * @memberof WsParticipantWasTyping
     */
    sourceId: string;
}

/**
 * Check if a given object implements the WsParticipantWasTyping interface.
 */
export function instanceOfWsParticipantWasTyping(value: object): value is WsParticipantWasTyping {
    if (!('participantId' in value) || value['participantId'] === undefined) return false;
    if (!('conversationId' in value) || value['conversationId'] === undefined) return false;
    if (!('wasTypingAt' in value) || value['wasTypingAt'] === undefined) return false;
    if (!('sourceId' in value) || value['sourceId'] === undefined) return false;
    return true;
}

export function WsParticipantWasTypingFromJSON(json: any): WsParticipantWasTyping {
    return WsParticipantWasTypingFromJSONTyped(json, false);
}

export function WsParticipantWasTypingFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsParticipantWasTyping {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'participantId': json['participant_id'],
        'conversationId': json['conversation_id'],
        'wasTypingAt': (new Date(json['wasTypingAt'])),
        'sourceId': json['sourceId'],
    };
}

export function WsParticipantWasTypingToJSON(json: any): WsParticipantWasTyping {
    return WsParticipantWasTypingToJSONTyped(json, false);
}

export function WsParticipantWasTypingToJSONTyped(value?: WsParticipantWasTyping | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'participant_id': value['participantId'],
        'conversation_id': value['conversationId'],
        'wasTypingAt': ((value['wasTypingAt']).toISOString()),
        'sourceId': value['sourceId'],
    };
}

