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
import type { Location } from './location';
import {
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
    LocationToJSONTyped,
} from './location';

/**
 * 
 * @export
 * @interface LocationWithAddress
 */
export interface LocationWithAddress {
    /**
     * 
     * @type {string}
     * @memberof LocationWithAddress
     */
    formattedAddress?: string | null;
    /**
     * 
     * @type {Location}
     * @memberof LocationWithAddress
     */
    location?: Location | null;
}

/**
 * Check if a given object implements the LocationWithAddress interface.
 */
export function instanceOfLocationWithAddress(value: object): value is LocationWithAddress {
    return true;
}

export function LocationWithAddressFromJSON(json: any): LocationWithAddress {
    return LocationWithAddressFromJSONTyped(json, false);
}

export function LocationWithAddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationWithAddress {
    if (json == null) {
        return json;
    }
    return {
        
        'formattedAddress': json['formatted_address'] == null ? undefined : json['formatted_address'],
        'location': json['location'] == null ? undefined : LocationFromJSON(json['location']),
    };
}

export function LocationWithAddressToJSON(json: any): LocationWithAddress {
    return LocationWithAddressToJSONTyped(json, false);
}

export function LocationWithAddressToJSONTyped(value?: LocationWithAddress | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'formatted_address': value['formattedAddress'],
        'location': LocationToJSON(value['location']),
    };
}

