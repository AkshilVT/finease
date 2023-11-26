import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import userService from "../services";
import { formatJSONResponse } from "@libs/api-gateway";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import checkAuth from "@libs/check-auth";


export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        const decoded = jwtDecode(event.multiValueHeaders.auth_token[0]);
        if (!decoded.sub) throw new Error("User id is required");

        const userId = decoded.sub;

        // check if user already exists
        const userExists = await userService.getUser(userId);
        if (userExists) throw new Error("User already exists");

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const user = await userService.createUser(
            {
                id: userId,
                username: null,
                profile: {
                    name: null,
                    email: null,
                    dob: null,
                    occupation: null,
                    marital_status: null,
                    phone_number: null,
                    createdAt,
                    updatedAt,
                },
                financial_details: {
                    incomes: {
                        salary: 0,
                        house_property: 0,
                        business_and_profession: 0,
                        capital_gains: 0,
                        other_sources: 0
                    },
                    insurance: {

                    },
                    createdAt,
                    updatedAt,
                },
                assets: [],
                budget: [],
                loans: [],
                investments: []
            }
        )
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

export const getUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: event.pathParameters.id });

        const { id } = event.pathParameters;
        if (!id) throw new Error("User id is required");

        const user = await userService.getUser(id);
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
