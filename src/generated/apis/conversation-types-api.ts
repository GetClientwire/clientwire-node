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
  ConversationType,
  ConversationTypeListResponse,
  ConversationTypePostRequest,
} from '../models/index';
import {
    ConversationTypeFromJSON,
    ConversationTypeToJSON,
    ConversationTypeListResponseFromJSON,
    ConversationTypeListResponseToJSON,
    ConversationTypePostRequestFromJSON,
    ConversationTypePostRequestToJSON,
} from '../models/index';

export interface CreateConversationTypeRequest {
    conversationTypePostRequest: ConversationTypePostRequest;
}

export interface CreateOrUpdateConversationTypeRequest {
    conversationTypeId: string;
    conversationTypePostRequest: ConversationTypePostRequest;
}

export interface DeleteConversationTypeRequest {
    conversationTypeId: string;
}

export interface GetConversationTypeRequest {
    conversationTypeId: string;
}

export interface UpdateConversationTypeRequest {
    conversationTypeId: string;
    requestBody: { [key: string]: any; };
}

/**
 * ConversationTypesApi - interface
 * 
 * @export
 * @interface ConversationTypesApiInterface
 */
export interface ConversationTypesApiInterface {
    /**
     * Creates a conversation type for a tenant.
     * @summary Create a new conversation type for the specified tenant.
     * @param {ConversationTypePostRequest} conversationTypePostRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    createConversationTypeRaw(requestParameters: CreateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>>;

    /**
     * Creates a conversation type for a tenant.
     * Create a new conversation type for the specified tenant.
     */
    createConversationType(requestParameters: CreateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType>;

    /**
     * If not found, conversation type is created; otherwise it is updated.
     * @summary Create or update a conversation type.
     * @param {string} conversationTypeId 
     * @param {ConversationTypePostRequest} conversationTypePostRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    createOrUpdateConversationTypeRaw(requestParameters: CreateOrUpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>>;

    /**
     * If not found, conversation type is created; otherwise it is updated.
     * Create or update a conversation type.
     */
    createOrUpdateConversationType(requestParameters: CreateOrUpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType>;

    /**
     * Removes a conversation type by its ID.
     * @summary Delete a conversation type.
     * @param {string} conversationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    deleteConversationTypeRaw(requestParameters: DeleteConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Removes a conversation type by its ID.
     * Delete a conversation type.
     */
    deleteConversationType(requestParameters: DeleteConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * Retrieves a conversation type by its ID.
     * @summary Get a single conversation type.
     * @param {string} conversationTypeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    getConversationTypeRaw(requestParameters: GetConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>>;

    /**
     * Retrieves a conversation type by its ID.
     * Get a single conversation type.
     */
    getConversationType(requestParameters: GetConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType>;

    /**
     * Returns all conversation types for the tenant.
     * @summary List all conversation types for the specified tenant.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    getConversationTypesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationTypeListResponse>>;

    /**
     * Returns all conversation types for the tenant.
     * List all conversation types for the specified tenant.
     */
    getConversationTypes(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationTypeListResponse>;

    /**
     * Allows patching only specific fields of a conversation type.
     * @summary Update partial fields of an existing conversation type.
     * @param {string} conversationTypeId 
     * @param {{ [key: string]: any; }} requestBody The patch body for updating conversation type fields.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationTypesApiInterface
     */
    updateConversationTypeRaw(requestParameters: UpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>>;

    /**
     * Allows patching only specific fields of a conversation type.
     * Update partial fields of an existing conversation type.
     */
    updateConversationType(requestParameters: UpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType>;

}

/**
 * 
 */
export class ConversationTypesApi extends runtime.BaseAPI implements ConversationTypesApiInterface {

    /**
     * Creates a conversation type for a tenant.
     * Create a new conversation type for the specified tenant.
     */
    async createConversationTypeRaw(requestParameters: CreateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>> {
        if (requestParameters['conversationTypePostRequest'] == null) {
            throw new runtime.RequiredError(
                'conversationTypePostRequest',
                'Required parameter "conversationTypePostRequest" was null or undefined when calling createConversationType().'
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
            path: `/api/v1/conversation-types`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ConversationTypePostRequestToJSON(requestParameters['conversationTypePostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConversationTypeFromJSON(jsonValue));
    }

    /**
     * Creates a conversation type for a tenant.
     * Create a new conversation type for the specified tenant.
     */
    async createConversationType(requestParameters: CreateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType> {
        const response = await this.createConversationTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * If not found, conversation type is created; otherwise it is updated.
     * Create or update a conversation type.
     */
    async createOrUpdateConversationTypeRaw(requestParameters: CreateOrUpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>> {
        if (requestParameters['conversationTypeId'] == null) {
            throw new runtime.RequiredError(
                'conversationTypeId',
                'Required parameter "conversationTypeId" was null or undefined when calling createOrUpdateConversationType().'
            );
        }

        if (requestParameters['conversationTypePostRequest'] == null) {
            throw new runtime.RequiredError(
                'conversationTypePostRequest',
                'Required parameter "conversationTypePostRequest" was null or undefined when calling createOrUpdateConversationType().'
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
            path: `/api/v1/conversation-types/{conversation_type_id}`.replace(`{${"conversation_type_id"}}`, encodeURIComponent(String(requestParameters['conversationTypeId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ConversationTypePostRequestToJSON(requestParameters['conversationTypePostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConversationTypeFromJSON(jsonValue));
    }

    /**
     * If not found, conversation type is created; otherwise it is updated.
     * Create or update a conversation type.
     */
    async createOrUpdateConversationType(requestParameters: CreateOrUpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType> {
        const response = await this.createOrUpdateConversationTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Removes a conversation type by its ID.
     * Delete a conversation type.
     */
    async deleteConversationTypeRaw(requestParameters: DeleteConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['conversationTypeId'] == null) {
            throw new runtime.RequiredError(
                'conversationTypeId',
                'Required parameter "conversationTypeId" was null or undefined when calling deleteConversationType().'
            );
        }

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
            path: `/api/v1/conversation-types/{conversation_type_id}`.replace(`{${"conversation_type_id"}}`, encodeURIComponent(String(requestParameters['conversationTypeId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Removes a conversation type by its ID.
     * Delete a conversation type.
     */
    async deleteConversationType(requestParameters: DeleteConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteConversationTypeRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieves a conversation type by its ID.
     * Get a single conversation type.
     */
    async getConversationTypeRaw(requestParameters: GetConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>> {
        if (requestParameters['conversationTypeId'] == null) {
            throw new runtime.RequiredError(
                'conversationTypeId',
                'Required parameter "conversationTypeId" was null or undefined when calling getConversationType().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-API-KEY"] = await this.configuration.apiKey("X-API-KEY"); // ApiKeyAuth authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversation-types/{conversation_type_id}`.replace(`{${"conversation_type_id"}}`, encodeURIComponent(String(requestParameters['conversationTypeId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConversationTypeFromJSON(jsonValue));
    }

    /**
     * Retrieves a conversation type by its ID.
     * Get a single conversation type.
     */
    async getConversationType(requestParameters: GetConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType> {
        const response = await this.getConversationTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns all conversation types for the tenant.
     * List all conversation types for the specified tenant.
     */
    async getConversationTypesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationTypeListResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-API-KEY"] = await this.configuration.apiKey("X-API-KEY"); // ApiKeyAuth authentication
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversation-types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConversationTypeListResponseFromJSON(jsonValue));
    }

    /**
     * Returns all conversation types for the tenant.
     * List all conversation types for the specified tenant.
     */
    async getConversationTypes(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationTypeListResponse> {
        const response = await this.getConversationTypesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Allows patching only specific fields of a conversation type.
     * Update partial fields of an existing conversation type.
     */
    async updateConversationTypeRaw(requestParameters: UpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConversationType>> {
        if (requestParameters['conversationTypeId'] == null) {
            throw new runtime.RequiredError(
                'conversationTypeId',
                'Required parameter "conversationTypeId" was null or undefined when calling updateConversationType().'
            );
        }

        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling updateConversationType().'
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
            path: `/api/v1/conversation-types/{conversation_type_id}`.replace(`{${"conversation_type_id"}}`, encodeURIComponent(String(requestParameters['conversationTypeId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConversationTypeFromJSON(jsonValue));
    }

    /**
     * Allows patching only specific fields of a conversation type.
     * Update partial fields of an existing conversation type.
     */
    async updateConversationType(requestParameters: UpdateConversationTypeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConversationType> {
        const response = await this.updateConversationTypeRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
