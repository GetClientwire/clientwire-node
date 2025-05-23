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


/**
 * 
 * @export
 */
export const ConditionOperator = {
    Equals: 'EQUALS',
    ChangedFromTo: 'CHANGED_FROM_TO',
    Changed: 'CHANGED',
    Exists: 'EXISTS',
    NotExists: 'NOT_EXISTS'
} as const;
export type ConditionOperator = typeof ConditionOperator[keyof typeof ConditionOperator];


export function instanceOfConditionOperator(value: any): boolean {
    for (const key in ConditionOperator) {
        if (Object.prototype.hasOwnProperty.call(ConditionOperator, key)) {
            if (ConditionOperator[key as keyof typeof ConditionOperator] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ConditionOperatorFromJSON(json: any): ConditionOperator {
    return ConditionOperatorFromJSONTyped(json, false);
}

export function ConditionOperatorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConditionOperator {
    return json as ConditionOperator;
}

export function ConditionOperatorToJSON(value?: ConditionOperator | null): any {
    return value as any;
}

export function ConditionOperatorToJSONTyped(value: any, ignoreDiscriminator: boolean): ConditionOperator {
    return value as ConditionOperator;
}

