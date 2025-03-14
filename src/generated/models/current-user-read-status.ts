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
 * @interface CurrentUserReadStatus
 */
export interface CurrentUserReadStatus {
    /**
     * The last seen message sequence number.
     * @type {number}
     * @memberof CurrentUserReadStatus
     */
    lastMessageSeen?: number;
    /**
     * The unread message count.
     * @type {number}
     * @memberof CurrentUserReadStatus
     */
    unreadMessageCount?: number;
}

/**
 * Check if a given object implements the CurrentUserReadStatus interface.
 */
export function instanceOfCurrentUserReadStatus(value: object): value is CurrentUserReadStatus {
    return true;
}

export function CurrentUserReadStatusFromJSON(json: any): CurrentUserReadStatus {
    return CurrentUserReadStatusFromJSONTyped(json, false);
}

export function CurrentUserReadStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): CurrentUserReadStatus {
    if (json == null) {
        return json;
    }
    return {
        
        'lastMessageSeen': json['last_message_seen'] == null ? undefined : json['last_message_seen'],
        'unreadMessageCount': json['unread_message_count'] == null ? undefined : json['unread_message_count'],
    };
}

export function CurrentUserReadStatusToJSON(json: any): CurrentUserReadStatus {
    return CurrentUserReadStatusToJSONTyped(json, false);
}

export function CurrentUserReadStatusToJSONTyped(value?: CurrentUserReadStatus | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'last_message_seen': value['lastMessageSeen'],
        'unread_message_count': value['unreadMessageCount'],
    };
}

