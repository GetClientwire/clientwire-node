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
export const Status1 = {
    UploadPending: 'UPLOAD_PENDING',
    UploadCompleted: 'UPLOAD_COMPLETED',
    UploadCompletedMissing: 'UPLOAD_COMPLETED_MISSING',
    UploadFailed: 'UPLOAD_FAILED',
    Unknown: 'UNKNOWN'
} as const;
export type Status1 = typeof Status1[keyof typeof Status1];


export function instanceOfStatus1(value: any): boolean {
    for (const key in Status1) {
        if (Object.prototype.hasOwnProperty.call(Status1, key)) {
            if (Status1[key as keyof typeof Status1] === value) {
                return true;
            }
        }
    }
    return false;
}

export function Status1FromJSON(json: any): Status1 {
    return Status1FromJSONTyped(json, false);
}

export function Status1FromJSONTyped(json: any, ignoreDiscriminator: boolean): Status1 {
    return json as Status1;
}

export function Status1ToJSON(value?: Status1 | null): any {
    return value as any;
}

export function Status1ToJSONTyped(value: any, ignoreDiscriminator: boolean): Status1 {
    return value as Status1;
}

