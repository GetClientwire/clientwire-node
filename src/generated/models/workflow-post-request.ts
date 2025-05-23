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
import type { WorkflowTrigger } from './workflow-trigger';
import {
    WorkflowTriggerFromJSON,
    WorkflowTriggerFromJSONTyped,
    WorkflowTriggerToJSON,
    WorkflowTriggerToJSONTyped,
} from './workflow-trigger';

/**
 * 
 * @export
 * @interface WorkflowPostRequest
 */
export interface WorkflowPostRequest {
    /**
     * The id of the conversation type to be assigned to this conversation.
     * @type {string}
     * @memberof WorkflowPostRequest
     */
    conversationTypeId?: string | null;
    /**
     * 
     * @type {WorkflowTrigger}
     * @memberof WorkflowPostRequest
     */
    trigger: WorkflowTrigger;
}

/**
 * Check if a given object implements the WorkflowPostRequest interface.
 */
export function instanceOfWorkflowPostRequest(value: object): value is WorkflowPostRequest {
    if (!('trigger' in value) || value['trigger'] === undefined) return false;
    return true;
}

export function WorkflowPostRequestFromJSON(json: any): WorkflowPostRequest {
    return WorkflowPostRequestFromJSONTyped(json, false);
}

export function WorkflowPostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkflowPostRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'conversationTypeId': json['conversation_type_id'] == null ? undefined : json['conversation_type_id'],
        'trigger': WorkflowTriggerFromJSON(json['trigger']),
    };
}

export function WorkflowPostRequestToJSON(json: any): WorkflowPostRequest {
    return WorkflowPostRequestToJSONTyped(json, false);
}

export function WorkflowPostRequestToJSONTyped(value?: WorkflowPostRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'conversation_type_id': value['conversationTypeId'],
        'trigger': WorkflowTriggerToJSON(value['trigger']),
    };
}

