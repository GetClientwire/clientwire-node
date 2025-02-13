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
  Participant,
  ParticipantActivityRequest,
  ParticipantListResponse,
  ParticipantPostRequest,
  ParticipantPutRequest,
} from '../models/index';
import {
    ParticipantFromJSON,
    ParticipantToJSON,
    ParticipantActivityRequestFromJSON,
    ParticipantActivityRequestToJSON,
    ParticipantListResponseFromJSON,
    ParticipantListResponseToJSON,
    ParticipantPostRequestFromJSON,
    ParticipantPostRequestToJSON,
    ParticipantPutRequestFromJSON,
    ParticipantPutRequestToJSON,
} from '../models/index';

export interface CreateOrUpdateParticipantRequest {
    conversationId: string;
    participantId: string;
    participantPutRequest: ParticipantPutRequest;
}

export interface CreateParticipantRequest {
    conversationId: string;
    participantPostRequest: ParticipantPostRequest;
}

export interface DeleteParticipantRequest {
    conversationId: string;
    participantId: string;
}

export interface GetParticipantRequest {
    conversationId: string;
    participantId: string;
}

export interface GetParticipantsRequest {
    conversationId: string;
}

export interface NotifyClientParticipantsRequest {
    conversationId: string;
}

export interface UpdateParticipantRequest {
    conversationId: string;
    participantId: string;
    requestBody: { [key: string]: any; };
}

export interface UpdateParticipantActivityRequest {
    conversationId: string;
    participantId: string;
    participantActivityRequest: ParticipantActivityRequest;
}

/**
 * ParticipantsApi - interface
 * 
 * @export
 * @interface ParticipantsApiInterface
 */
export interface ParticipantsApiInterface {
    /**
     * If participant doesn’t exist, it is created, otherwise it is fully updated.
     * @summary Create or update a participant in the specified conversation.
     * @param {string} conversationId 
     * @param {string} participantId 
     * @param {ParticipantPutRequest} participantPutRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    createOrUpdateParticipantRaw(requestParameters: CreateOrUpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>>;

    /**
     * If participant doesn’t exist, it is created, otherwise it is fully updated.
     * Create or update a participant in the specified conversation.
     */
    createOrUpdateParticipant(requestParameters: CreateOrUpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant>;

    /**
     * Creates a conversation participant.
     * @summary Create a new participant in the specified conversation.
     * @param {string} conversationId 
     * @param {ParticipantPostRequest} participantPostRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    createParticipantRaw(requestParameters: CreateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>>;

    /**
     * Creates a conversation participant.
     * Create a new participant in the specified conversation.
     */
    createParticipant(requestParameters: CreateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant>;

    /**
     * Removes a participant by ID.
     * @summary Delete a participant from the specified conversation.
     * @param {string} conversationId 
     * @param {string} participantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    deleteParticipantRaw(requestParameters: DeleteParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Removes a participant by ID.
     * Delete a participant from the specified conversation.
     */
    deleteParticipant(requestParameters: DeleteParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * Retrieves the participant details for the calling CLIENT_PARTICIPANT token.
     * @summary Get information about the client participant and its conversation.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    getClientParticipantHimselfRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>>;

    /**
     * Retrieves the participant details for the calling CLIENT_PARTICIPANT token.
     * Get information about the client participant and its conversation.
     */
    getClientParticipantHimself(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant>;

    /**
     * Retrieves participant details by ID.
     * @summary Get a single participant in the specified conversation.
     * @param {string} conversationId 
     * @param {string} participantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    getParticipantRaw(requestParameters: GetParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>>;

    /**
     * Retrieves participant details by ID.
     * Get a single participant in the specified conversation.
     */
    getParticipant(requestParameters: GetParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant>;

    /**
     * Returns all participants for a conversation.
     * @summary List all participants in the specified conversation.
     * @param {string} conversationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    getParticipantsRaw(requestParameters: GetParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ParticipantListResponse>>;

    /**
     * Returns all participants for a conversation.
     * List all participants in the specified conversation.
     */
    getParticipants(requestParameters: GetParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ParticipantListResponse>;

    /**
     * Sends a notification to participants of the conversation.
     * @summary Notify conversation client participants.
     * @param {string} conversationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    notifyClientParticipantsRaw(requestParameters: NotifyClientParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Sends a notification to participants of the conversation.
     * Notify conversation client participants.
     */
    notifyClientParticipants(requestParameters: NotifyClientParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * Allows updating only display_name, phone_number, email, etc.
     * @summary Patch partial fields of a participant.
     * @param {string} conversationId 
     * @param {string} participantId 
     * @param {{ [key: string]: any; }} requestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    updateParticipantRaw(requestParameters: UpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>>;

    /**
     * Allows updating only display_name, phone_number, email, etc.
     * Patch partial fields of a participant.
     */
    updateParticipant(requestParameters: UpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant>;

    /**
     * Update participant’s message-seen info, etc.
     * @summary Record participant activity.
     * @param {string} conversationId 
     * @param {string} participantId 
     * @param {ParticipantActivityRequest} participantActivityRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApiInterface
     */
    updateParticipantActivityRaw(requestParameters: UpdateParticipantActivityRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Update participant’s message-seen info, etc.
     * Record participant activity.
     */
    updateParticipantActivity(requestParameters: UpdateParticipantActivityRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

}

/**
 * 
 */
export class ParticipantsApi extends runtime.BaseAPI implements ParticipantsApiInterface {

    /**
     * If participant doesn’t exist, it is created, otherwise it is fully updated.
     * Create or update a participant in the specified conversation.
     */
    async createOrUpdateParticipantRaw(requestParameters: CreateOrUpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling createOrUpdateParticipant().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling createOrUpdateParticipant().'
            );
        }

        if (requestParameters['participantPutRequest'] == null) {
            throw new runtime.RequiredError(
                'participantPutRequest',
                'Required parameter "participantPutRequest" was null or undefined when calling createOrUpdateParticipant().'
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
            const tokenString = await token("BearerAuth", ["USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversations/{conversation_id}/participants/{participant_id}`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))).replace(`{${"participant_id"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ParticipantPutRequestToJSON(requestParameters['participantPutRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantFromJSON(jsonValue));
    }

    /**
     * If participant doesn’t exist, it is created, otherwise it is fully updated.
     * Create or update a participant in the specified conversation.
     */
    async createOrUpdateParticipant(requestParameters: CreateOrUpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant> {
        const response = await this.createOrUpdateParticipantRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates a conversation participant.
     * Create a new participant in the specified conversation.
     */
    async createParticipantRaw(requestParameters: CreateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling createParticipant().'
            );
        }

        if (requestParameters['participantPostRequest'] == null) {
            throw new runtime.RequiredError(
                'participantPostRequest',
                'Required parameter "participantPostRequest" was null or undefined when calling createParticipant().'
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
            const tokenString = await token("BearerAuth", ["USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversations/{conversation_id}/participants`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ParticipantPostRequestToJSON(requestParameters['participantPostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantFromJSON(jsonValue));
    }

    /**
     * Creates a conversation participant.
     * Create a new participant in the specified conversation.
     */
    async createParticipant(requestParameters: CreateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant> {
        const response = await this.createParticipantRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Removes a participant by ID.
     * Delete a participant from the specified conversation.
     */
    async deleteParticipantRaw(requestParameters: DeleteParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling deleteParticipant().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling deleteParticipant().'
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
            path: `/api/v1/conversations/{conversation_id}/participants/{participant_id}`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))).replace(`{${"participant_id"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Removes a participant by ID.
     * Delete a participant from the specified conversation.
     */
    async deleteParticipant(requestParameters: DeleteParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteParticipantRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieves the participant details for the calling CLIENT_PARTICIPANT token.
     * Get information about the client participant and its conversation.
     */
    async getClientParticipantHimselfRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", ["CLIENT_PARTICIPANT"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/client-participant/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantFromJSON(jsonValue));
    }

    /**
     * Retrieves the participant details for the calling CLIENT_PARTICIPANT token.
     * Get information about the client participant and its conversation.
     */
    async getClientParticipantHimself(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant> {
        const response = await this.getClientParticipantHimselfRaw(initOverrides);
        return await response.value();
    }

    /**
     * Retrieves participant details by ID.
     * Get a single participant in the specified conversation.
     */
    async getParticipantRaw(requestParameters: GetParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling getParticipant().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling getParticipant().'
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
            path: `/api/v1/conversations/{conversation_id}/participants/{participant_id}`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))).replace(`{${"participant_id"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantFromJSON(jsonValue));
    }

    /**
     * Retrieves participant details by ID.
     * Get a single participant in the specified conversation.
     */
    async getParticipant(requestParameters: GetParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant> {
        const response = await this.getParticipantRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns all participants for a conversation.
     * List all participants in the specified conversation.
     */
    async getParticipantsRaw(requestParameters: GetParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ParticipantListResponse>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling getParticipants().'
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
            path: `/api/v1/conversations/{conversation_id}/participants`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantListResponseFromJSON(jsonValue));
    }

    /**
     * Returns all participants for a conversation.
     * List all participants in the specified conversation.
     */
    async getParticipants(requestParameters: GetParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ParticipantListResponse> {
        const response = await this.getParticipantsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Sends a notification to participants of the conversation.
     * Notify conversation client participants.
     */
    async notifyClientParticipantsRaw(requestParameters: NotifyClientParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling notifyClientParticipants().'
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
            path: `/api/v1/conversations/{conversation_id}/participants/notify`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sends a notification to participants of the conversation.
     * Notify conversation client participants.
     */
    async notifyClientParticipants(requestParameters: NotifyClientParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.notifyClientParticipantsRaw(requestParameters, initOverrides);
    }

    /**
     * Allows updating only display_name, phone_number, email, etc.
     * Patch partial fields of a participant.
     */
    async updateParticipantRaw(requestParameters: UpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Participant>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling updateParticipant().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling updateParticipant().'
            );
        }

        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling updateParticipant().'
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
            const tokenString = await token("BearerAuth", ["USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversations/{conversation_id}/participants/{participant_id}`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))).replace(`{${"participant_id"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantFromJSON(jsonValue));
    }

    /**
     * Allows updating only display_name, phone_number, email, etc.
     * Patch partial fields of a participant.
     */
    async updateParticipant(requestParameters: UpdateParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Participant> {
        const response = await this.updateParticipantRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update participant’s message-seen info, etc.
     * Record participant activity.
     */
    async updateParticipantActivityRaw(requestParameters: UpdateParticipantActivityRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['conversationId'] == null) {
            throw new runtime.RequiredError(
                'conversationId',
                'Required parameter "conversationId" was null or undefined when calling updateParticipantActivity().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling updateParticipantActivity().'
            );
        }

        if (requestParameters['participantActivityRequest'] == null) {
            throw new runtime.RequiredError(
                'participantActivityRequest',
                'Required parameter "participantActivityRequest" was null or undefined when calling updateParticipantActivity().'
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
            const tokenString = await token("BearerAuth", ["CLIENT_PARTICIPANT", "USER", "OWNER", "API_KEY"]);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/conversations/{conversation_id}/participants/{participant_id}/activity`.replace(`{${"conversation_id"}}`, encodeURIComponent(String(requestParameters['conversationId']))).replace(`{${"participant_id"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ParticipantActivityRequestToJSON(requestParameters['participantActivityRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update participant’s message-seen info, etc.
     * Record participant activity.
     */
    async updateParticipantActivity(requestParameters: UpdateParticipantActivityRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateParticipantActivityRaw(requestParameters, initOverrides);
    }

}
