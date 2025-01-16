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


import * as runtime from '../runtime';
import type {
  TwilioSettings,
} from '../models/index';
import {
    TwilioSettingsFromJSON,
    TwilioSettingsToJSON,
} from '../models/index';

export interface UpsertTwilioSmsSettingsRequest {
    twilioSettings: TwilioSettings;
}

/**
 * SMSSettingsApi - interface
 * 
 * @export
 * @interface SMSSettingsApiInterface
 */
export interface SMSSettingsApiInterface {
    /**
     * Removes the Twilio SMS settings for the tenant if they exist.
     * @summary Delete the Twilio SMS settings for this tenant.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSSettingsApiInterface
     */
    deleteTwilioSmsSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Removes the Twilio SMS settings for the tenant if they exist.
     * Delete the Twilio SMS settings for this tenant.
     */
    deleteTwilioSmsSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * Returns the Twilio SMS settings if available.
     * @summary Get the Twilio SMS settings for this tenant.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSSettingsApiInterface
     */
    getTwilioSmsSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TwilioSettings>>;

    /**
     * Returns the Twilio SMS settings if available.
     * Get the Twilio SMS settings for this tenant.
     */
    getTwilioSmsSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TwilioSettings>;

    /**
     * Upserts the Twilio SMS settings for the specified tenant.
     * @summary Create or update Twilio SMS settings for this tenant.
     * @param {TwilioSettings} twilioSettings Twilio SMS settings data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SMSSettingsApiInterface
     */
    upsertTwilioSmsSettingsRaw(requestParameters: UpsertTwilioSmsSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TwilioSettings>>;

    /**
     * Upserts the Twilio SMS settings for the specified tenant.
     * Create or update Twilio SMS settings for this tenant.
     */
    upsertTwilioSmsSettings(requestParameters: UpsertTwilioSmsSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TwilioSettings>;

}

/**
 * 
 */
export class SMSSettingsApi extends runtime.BaseAPI implements SMSSettingsApiInterface {

    /**
     * Removes the Twilio SMS settings for the tenant if they exist.
     * Delete the Twilio SMS settings for this tenant.
     */
    async deleteTwilioSmsSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-API-KEY"] = await this.configuration.apiKey("X-API-KEY"); // ApiKeyAuth authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/sms/twilio`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Removes the Twilio SMS settings for the tenant if they exist.
     * Delete the Twilio SMS settings for this tenant.
     */
    async deleteTwilioSmsSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTwilioSmsSettingsRaw(initOverrides);
    }

    /**
     * Returns the Twilio SMS settings if available.
     * Get the Twilio SMS settings for this tenant.
     */
    async getTwilioSmsSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TwilioSettings>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-API-KEY"] = await this.configuration.apiKey("X-API-KEY"); // ApiKeyAuth authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/sms/twilio`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TwilioSettingsFromJSON(jsonValue));
    }

    /**
     * Returns the Twilio SMS settings if available.
     * Get the Twilio SMS settings for this tenant.
     */
    async getTwilioSmsSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TwilioSettings> {
        const response = await this.getTwilioSmsSettingsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Upserts the Twilio SMS settings for the specified tenant.
     * Create or update Twilio SMS settings for this tenant.
     */
    async upsertTwilioSmsSettingsRaw(requestParameters: UpsertTwilioSmsSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TwilioSettings>> {
        if (requestParameters['twilioSettings'] == null) {
            throw new runtime.RequiredError(
                'twilioSettings',
                'Required parameter "twilioSettings" was null or undefined when calling upsertTwilioSmsSettings().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-API-KEY"] = await this.configuration.apiKey("X-API-KEY"); // ApiKeyAuth authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/sms/twilio`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TwilioSettingsToJSON(requestParameters['twilioSettings']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TwilioSettingsFromJSON(jsonValue));
    }

    /**
     * Upserts the Twilio SMS settings for the specified tenant.
     * Create or update Twilio SMS settings for this tenant.
     */
    async upsertTwilioSmsSettings(requestParameters: UpsertTwilioSmsSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TwilioSettings> {
        const response = await this.upsertTwilioSmsSettingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
