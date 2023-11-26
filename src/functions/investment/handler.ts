import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";
import { middyfy } from "@libs/lambda";
import Ajv from "ajv";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Investment from "src/models/Investment";
import userService from "src/services";
import checkAuth from "@libs/check-auth";

export const addInvestment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) throw new Error("User id is required");

        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const investment: Investment = event.body as unknown as Investment;
        if (!investment) throw new Error("Investment is required");

        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                description: { type: "string" },
                type_of_investment: { type: "string" },
                amount: { type: "number" },
                date_of_acquisition: { type: "string" },
                date_of_return: { type: "string" },
                apy: { type: "number" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
            },
            additionalProperties: false,
            required: ["name", "description", "type_of_investment", "amount", "date_of_acquisition", "date_of_return", "apy"]
        });

        const valid = validate(investment);
        if (!valid) throw new Error(validate.errors[0].message);

        const user = await userService.updateUser({
            ...oldUser,
            investments: [
                ...oldUser.investments,
                {
                    ...investment,
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
            message: error.message
        })
    }
}
);

export const updateInvestment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, investmentId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!investmentId) throw new Error("Investment id is required");

        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const investment: Investment = event.body as unknown as Investment;
        if (!investment) throw new Error("Investment is required");

        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                description: { type: "string" },
                type_of_investment: { type: "string" },
                amount: { type: "number" },
                date_of_acquisition: { type: "string" },
                date_of_return: { type: "string" },
                apy: { type: "number" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
            },
            additionalProperties: false,
            required: ["name", "description", "type_of_investment", "amount", "date_of_acquisition", "date_of_return", "apy"]
        });

        const valid = validate(investment);
        if (!valid) throw new Error(validate.errors[0].message);

        // check if investment exists
        const investmentExists = oldUser.investments.find(investment => investment.id === investmentId);
        if (!investmentExists) throw new Error("Investment not found");

        const user = await userService.updateUser({
            ...oldUser,
            investments: [
                ...oldUser.investments.filter(investment => investment.id !== investmentId),
                {
                    ...investment,
                    id: investmentId,
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
            message: error.message
        })
    }
});

export const deleteInvestment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, investmentId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!investmentId) throw new Error("Investment id is required");

        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        // check if investment exists
        const investmentExists = oldUser.investments.find(investment => investment.id === investmentId);
        if (!investmentExists) throw new Error("Investment not found");

        const user = await userService.updateUser({
            ...oldUser,
            investments: oldUser.investments.filter(investment => investment.id !== investmentId)
        });
        return formatJSONResponse({
            user
        })
    }

    catch (error) {
        return formatJSONResponse({
            status: 500,
            message: error.message
        })
    }
});