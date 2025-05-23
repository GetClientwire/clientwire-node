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
export const Language = {
    En: 'EN',
    De: 'DE'
} as const;
export type Language = typeof Language[keyof typeof Language];


export function instanceOfLanguage(value: any): boolean {
    for (const key in Language) {
        if (Object.prototype.hasOwnProperty.call(Language, key)) {
            if (Language[key as keyof typeof Language] === value) {
                return true;
            }
        }
    }
    return false;
}

export function LanguageFromJSON(json: any): Language {
    return LanguageFromJSONTyped(json, false);
}

export function LanguageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Language {
    return json as Language;
}

export function LanguageToJSON(value?: Language | null): any {
    return value as any;
}

export function LanguageToJSONTyped(value: any, ignoreDiscriminator: boolean): Language {
    return value as Language;
}

