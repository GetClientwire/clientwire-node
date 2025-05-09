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
import type { LocationSource } from './location-source';
import {
    LocationSourceFromJSON,
    LocationSourceFromJSONTyped,
    LocationSourceToJSON,
    LocationSourceToJSONTyped,
} from './location-source';

/**
 * 
 * @export
 * @interface Location
 */
export interface Location {
    /**
     * Latitude of the location
     * @type {number}
     * @memberof Location
     */
    latitude: number;
    /**
     * Longitude of the location
     * @type {number}
     * @memberof Location
     */
    longitude: number;
    /**
     * Location accuracy in meters
     * @type {number}
     * @memberof Location
     */
    accuracy?: number | null;
    /**
     * 
     * @type {Date}
     * @memberof Location
     */
    positionedAt?: Date | null;
    /**
     * The location source, if it was from the phone it's GPS, if the user moves it's MANUAL
     * @type {LocationSource}
     * @memberof Location
     */
    source?: LocationSource | null;
}



/**
 * Check if a given object implements the Location interface.
 */
export function instanceOfLocation(value: object): value is Location {
    if (!('latitude' in value) || value['latitude'] === undefined) return false;
    if (!('longitude' in value) || value['longitude'] === undefined) return false;
    return true;
}

export function LocationFromJSON(json: any): Location {
    return LocationFromJSONTyped(json, false);
}

export function LocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Location {
    if (json == null) {
        return json;
    }
    return {
        
        'latitude': json['latitude'],
        'longitude': json['longitude'],
        'accuracy': json['accuracy'] == null ? undefined : json['accuracy'],
        'positionedAt': json['positioned_at'] == null ? undefined : (new Date(json['positioned_at'])),
        'source': json['source'] == null ? undefined : LocationSourceFromJSON(json['source']),
    };
}

export function LocationToJSON(json: any): Location {
    return LocationToJSONTyped(json, false);
}

export function LocationToJSONTyped(value?: Location | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'latitude': value['latitude'],
        'longitude': value['longitude'],
        'accuracy': value['accuracy'],
        'positioned_at': value['positionedAt'] == null ? undefined : ((value['positionedAt'] as any).toISOString()),
        'source': LocationSourceToJSON(value['source']),
    };
}

