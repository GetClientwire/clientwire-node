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
import type { Workflow } from './workflow';
import {
    WorkflowFromJSON,
    WorkflowFromJSONTyped,
    WorkflowToJSON,
    WorkflowToJSONTyped,
} from './workflow';

/**
 * 
 * @export
 * @interface WorkflowPaginatedResponse
 */
export interface WorkflowPaginatedResponse {
    /**
     * Indicates if there are more pages to fetch.
     * @type {boolean}
     * @memberof WorkflowPaginatedResponse
     */
    hasMore: boolean;
    /**
     * Total number of elements across all pages.
     * @type {number}
     * @memberof WorkflowPaginatedResponse
     */
    totalElements: number | null;
    /**
     * The maximum number of elements in this page.
     * @type {number}
     * @memberof WorkflowPaginatedResponse
     */
    limit: number | null;
    /**
     * List of workflows.
     * @type {Array<Workflow>}
     * @memberof WorkflowPaginatedResponse
     */
    workflows: Array<Workflow>;
    /**
     * The offset of the first element in this page (for offset-based pagination). Either offset or last_sequence must be set.
     * @type {number}
     * @memberof WorkflowPaginatedResponse
     */
    offset?: number | null;
    /**
     * The sequence (or key) of the last element in this page (for key-based pagination). Either offset or last_sequence must be set.
     * @type {number}
     * @memberof WorkflowPaginatedResponse
     */
    lastSequence?: number | null;
}

/**
 * Check if a given object implements the WorkflowPaginatedResponse interface.
 */
export function instanceOfWorkflowPaginatedResponse(value: object): value is WorkflowPaginatedResponse {
    if (!('hasMore' in value) || value['hasMore'] === undefined) return false;
    if (!('totalElements' in value) || value['totalElements'] === undefined) return false;
    if (!('limit' in value) || value['limit'] === undefined) return false;
    if (!('workflows' in value) || value['workflows'] === undefined) return false;
    return true;
}

export function WorkflowPaginatedResponseFromJSON(json: any): WorkflowPaginatedResponse {
    return WorkflowPaginatedResponseFromJSONTyped(json, false);
}

export function WorkflowPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkflowPaginatedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'hasMore': json['has_more'],
        'totalElements': json['total_elements'],
        'limit': json['limit'],
        'workflows': ((json['workflows'] as Array<any>).map(WorkflowFromJSON)),
        'offset': json['offset'] == null ? undefined : json['offset'],
        'lastSequence': json['last_sequence'] == null ? undefined : json['last_sequence'],
    };
}

export function WorkflowPaginatedResponseToJSON(json: any): WorkflowPaginatedResponse {
    return WorkflowPaginatedResponseToJSONTyped(json, false);
}

export function WorkflowPaginatedResponseToJSONTyped(value?: WorkflowPaginatedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'has_more': value['hasMore'],
        'total_elements': value['totalElements'],
        'limit': value['limit'],
        'workflows': ((value['workflows'] as Array<any>).map(WorkflowToJSON)),
        'offset': value['offset'],
        'last_sequence': value['lastSequence'],
    };
}

