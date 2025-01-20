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
 * Represents a tenant with a unique ID, subdomain, and metadata.
 * @export
 * @interface Tenant
 */
export interface Tenant {
    /**
     * Unique identifier for the tenant.
     * @type {string}
     * @memberof Tenant
     */
    id: string;
    /**
     * The name of the tenant.
     * @type {string}
     * @memberof Tenant
     */
    name: string;
    /**
     * The subdomain of the tenant. Used as the subdomain in the URL.
     * @type {string}
     * @memberof Tenant
     */
    subdomain: string;
    /**
     * The endpoint that should be used to verify the token if you want to enable token-exchange flow and. It must be a oauth2 userinfo endpoint.
     * @type {string}
     * @memberof Tenant
     */
    tokenExchangeUserinfoUrl?: string | null;
    /**
     * If a user logs in with an email address that matches one of these domains, a new user will be created automatically.
     * @type {Array<string>}
     * @memberof Tenant
     */
    userAutoProvisioningDomains?: Array<string> | null;
}

/**
 * Check if a given object implements the Tenant interface.
 */
export function instanceOfTenant(value: object): value is Tenant {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('subdomain' in value) || value['subdomain'] === undefined) return false;
    return true;
}

export function TenantFromJSON(json: any): Tenant {
    return TenantFromJSONTyped(json, false);
}

export function TenantFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tenant {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'subdomain': json['subdomain'],
        'tokenExchangeUserinfoUrl': json['token_exchange_userinfo_url'] == null ? undefined : json['token_exchange_userinfo_url'],
        'userAutoProvisioningDomains': json['user_auto_provisioning_domains'] == null ? undefined : json['user_auto_provisioning_domains'],
    };
}

export function TenantToJSON(json: any): Tenant {
    return TenantToJSONTyped(json, false);
}

export function TenantToJSONTyped(value?: Tenant | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'subdomain': value['subdomain'],
        'token_exchange_userinfo_url': value['tokenExchangeUserinfoUrl'],
        'user_auto_provisioning_domains': value['userAutoProvisioningDomains'],
    };
}

