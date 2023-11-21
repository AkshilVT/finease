import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import Ajv from "ajv";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Asset from "src/models/Asset";
import userService from "src/services";

export const addAsset = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) throw new Error("User id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const asset: Asset = event.body as unknown as Asset;
        if (!asset) throw new Error("Asset is required");


        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                value: { type: "number" },
                type: { type: "string" },
                description: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
            },
            additionalProperties: false,
            required: ["name", "value", "type", "description"]
        });

        const valid = validate(asset);
        if (!valid) throw new Error(validate.errors[0].message);


        const user = await userService.updateUser({
            ...oldUser,
            assets: [
                ...oldUser.assets,
                {
                    ...asset,
                    id: v4(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ]
        });
        return formatJSONResponse({
            user
        })

    }
    catch (error) {
        return formatJSONResponse({
            status: 500,
            message: error
        })
    }
});

export const updateAsset = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, assetId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!assetId) throw new Error("Asset id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const asset: Asset = event.body as unknown as Asset;
        if (!asset) throw new Error("Asset is required");

        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                name: { type: "string" },
                value: { type: "number" },
                type: { type: "string" },
                description: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
            },
            additionalProperties: false,
            required: ["name", "value", "type", "description"]
        });

        const valid = validate(asset);
        if (!valid) throw new Error(validate.errors[0].message);

        const assetIndex = oldUser.assets.findIndex(asset => asset.id === assetId);
        if (assetIndex === -1) throw new Error("Asset not found");

        const assets = oldUser.assets;
        assets[assetIndex] = {
            ...asset,
            id: assetId,
            updatedAt: new Date().toISOString()
        }

        const user = await userService.updateUser({
            ...oldUser,
            assets
        });
        return formatJSONResponse({
            user
        })

    }
    catch (error) {
        return formatJSONResponse({
            status: 500,
            message: error
        })
    }
});

export const deleteAsset = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, assetId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!assetId) throw new Error("Asset id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const assetIndex = oldUser.assets.findIndex(asset => asset.id === assetId);
        if (assetIndex === -1) throw new Error("Asset not found");

        const assets = oldUser.assets;
        assets.splice(assetIndex, 1);

        const user = await userService.updateUser({
            ...oldUser,
            assets
        });
        return formatJSONResponse({
            user
        })

    }
    catch (error) {
        return formatJSONResponse({
            status: 500,
            message: error
        })
    }
});