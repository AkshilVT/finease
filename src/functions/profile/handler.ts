import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import Ajv from "ajv";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import FinancialDetails from "src/models/FinancialDetails";
import Profile from "src/models/Profile";
import userService from "src/services";

export const updateProfile = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) {
            console.error("User id is required");
            throw new Error("User id is required")
        };

        const oldUser = await userService.getUser(id);
        if (!oldUser) {
            console.error("User not found");
            throw new Error("User not found")
        };

        const profile: Profile = event.body as unknown as Profile;

        if (!profile || Object.keys(profile).length === 0) {
            console.error("Profile is required");
            throw new Error("Profile is required");
        }

        // validate profile with ajv
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                dob: { type: "string" },
                occupation: { type: "string" },
                marital_status: { type: "string" },
                phone_number: { type: "string" },
            },
            additionalProperties: false,
            // required: ["name", "email", "dob", "occupation", "marital_status", "phone_number"]
        });

        const valid = validate(profile);
        if (!valid) {
            console.error(validate.errors[0].message);
            throw new Error(validate.errors[0].message)
        };

        const user = await userService.updateUser({
            ...oldUser,
            profile: {
                ...oldUser.profile,
                ...profile,
                updatedAt: new Date().toISOString()
            }
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


export const updateFinancialDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) {
            console.error("User id is required");
            throw new Error("User id is required")
        };

        const oldUser = await userService.getUser(id);
        if (!oldUser) {
            console.error("User not found");
            throw new Error("User not found")
        };

        const financial_details: FinancialDetails = event.body as unknown as FinancialDetails;

        if (!financial_details || Object.keys(financial_details).length === 0) {
            console.error("Financial Details is required");
            throw new Error("Financial Details is required");
        }

        // validate financial_details with ajv
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                incomes: {
                    type: "object",
                    properties: {
                        salary: { type: "number" },
                        house_property: { type: "number" },
                        business_and_profession: { type: "number" },
                        capital_gains: { type: "number" },
                        other_sources: { type: "number" }
                    },
                    additionalProperties: false,
                },
                // insurance: {
                //     type: "object",
                //     properties: {
                //         life_insurance: { type: "number" },
                //         health_insurance: { type: "number" },
                //         vehicle_insurance: { type: "number" },
                //         other_insurance: { type: "number" }
                //     },
                //     additionalProperties: false,
                // }
            },
            additionalProperties: false
        });

        const valid = validate(financial_details);
        if (!valid) {
            console.error(validate.errors[0].message);
            throw new Error(validate.errors[0].message)
        };

        const user = await userService.updateUser({
            ...oldUser,
            financial_details: {
                ...oldUser.financial_details,
                ...financial_details,
                updatedAt: new Date().toISOString()
            }
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

