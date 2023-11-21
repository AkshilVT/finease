import Ajv from "ajv";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import userService from "../services";
import { formatJSONResponse } from "@libs/api-gateway";

export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userId = v4();
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const user = await userService.createUser(
            {
                id: userId,
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
            message: error
        })
    }
});

export const getUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
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
            message: error
        })
    }
});

// export const
// export const updateFinancialDetails = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     try {
//         const { id } = event.pathParameters;
//         if (!id) throw new Error("User id is required");

//         const financial_details: FinancialDetails = JSON.parse(event.body);
//         if (!financial_details) throw new Error("Financial Details is required");

//         const ajv = new Ajv();
//         const validate = ajv.compile({
//             type: "object",
//             properties: {
//                 incomes: {
//                     type: "object",
//                     properties: {
//                         salary: { type: "number" },
//                         house_property: { type: "number" },
//                         business_and_profession: { type: "number" },
//                         capital_gains: { type: "number" },
//                         other_sources: { type: "number" }
//                     },
//                     required: ["salary", "house_property", "business_and_profession", "capital_gains", "other_sources"]
//                 },
//                 insurance: {
//                     type: "object",
//                     properties: {
//                         life_insurance: { type: "number" },
//                         health_insurance: { type: "number" },
//                         vehicle_insurance: { type: "number" },
//                         other_insurance: { type: "number" }
//                     },
//                     required: ["life_insurance", "health_insurance", "vehicle_insurance", "other_insurance"]
//                 }
//             },
//             required: ["incomes", "insurance"]
//         });

//         const valid = validate(financial_details);
//         if (!valid) throw new Error(validate.errors[0].message);

//         const oldUser = await userService.getUser(id);

//         const user = await userService.updateUser({
//             ...oldUser,
//             financial_details: {
//                 ...oldUser.financial_details,
//                 ...financial_details,
//                 updatedAt: new Date().toISOString()
//             }
//         });
//         return formatJSONResponse({
//             user
//         })
//     }
//     catch (error) {
//         return formatJSONResponse({
//             status: 500,
//             message: error
//         })
//     }
// });