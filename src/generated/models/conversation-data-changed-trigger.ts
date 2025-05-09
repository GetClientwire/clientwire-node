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
import type { ConditionOperator } from './condition-operator';
import {
    ConditionOperatorFromJSON,
    ConditionOperatorFromJSONTyped,
    ConditionOperatorToJSON,
    ConditionOperatorToJSONTyped,
} from './condition-operator';
import type { TriggerKind } from './trigger-kind';
import {
    TriggerKindFromJSON,
    TriggerKindFromJSONTyped,
    TriggerKindToJSON,
    TriggerKindToJSONTyped,
} from './trigger-kind';

/**
 * Trigger fired when conversation data changes
 * @export
 * @interface ConversationDataChangedTrigger
 */
export interface ConversationDataChangedTrigger {
    /**
     * Discriminator property to identify the trigger type
     * @type {TriggerKind}
     * @memberof ConversationDataChangedTrigger
     */
    kind: TriggerKind;
    /**
     * 
     * @type {string}
     * @memberof ConversationDataChangedTrigger
     */
    jsonPath: string;
    /**
     * 
     * @type {ConditionOperator}
     * @memberof ConversationDataChangedTrigger
     */
    operator: ConditionOperator;
    /**
     * 
     * @type {string}
     * @memberof ConversationDataChangedTrigger
     */
    newValue?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ConversationDataChangedTrigger
     */
    oldValue?: string | null;
}



/**
 * Check if a given object implements the ConversationDataChangedTrigger interface.
 */
export function instanceOfConversationDataChangedTrigger(value: object): value is ConversationDataChangedTrigger {
    if (!('kind' in value) || value['kind'] === undefined) return false;
    if (!('jsonPath' in value) || value['jsonPath'] === undefined) return false;
    if (!('operator' in value) || value['operator'] === undefined) return false;
    return true;
}

export function ConversationDataChangedTriggerFromJSON(json: any): ConversationDataChangedTrigger {
    return ConversationDataChangedTriggerFromJSONTyped(json, false);
}

export function ConversationDataChangedTriggerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConversationDataChangedTrigger {
    if (json == null) {
        return json;
    }
    return {
        
        'kind': TriggerKindFromJSON(json['kind']),
        'jsonPath': json['json_path'],
        'operator': ConditionOperatorFromJSON(json['operator']),
        'newValue': json['new_value'] == null ? undefined : json['new_value'],
        'oldValue': json['old_value'] == null ? undefined : json['old_value'],
    };
}

export function ConversationDataChangedTriggerToJSON(json: any): ConversationDataChangedTrigger {
    return ConversationDataChangedTriggerToJSONTyped(json, false);
}

export function ConversationDataChangedTriggerToJSONTyped(value?: ConversationDataChangedTrigger | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'kind': TriggerKindToJSON(value['kind']),
        'json_path': value['jsonPath'],
        'operator': ConditionOperatorToJSON(value['operator']),
        'new_value': value['newValue'],
        'old_value': value['oldValue'],
    };
}

