import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";
import { middyfy } from "@libs/lambda";
import Ajv from "ajv";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import BudgetEntry from "src/models/BudgetEntry";
import userService from "src/services";
import checkAuth from "@libs/check-auth";

export const addBudgetEntry = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) throw new Error("User id is required");

        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const { year, month } = event.queryStringParameters;
        // check if the month and year are numbers
        if (!year) throw new Error("Year is required");
        if (!month) throw new Error("Month is required");
        if (isNaN(Number(year))) throw new Error("Year must be a number");
        if (isNaN(Number(month))) throw new Error("Month must be a number");


        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const budgetEntry: BudgetEntry = event.body as unknown as BudgetEntry;
        if (!budgetEntry) throw new Error("Budget entry is required");


        // validate budget entry with ajv
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                amount: { type: "number" },
                category: { type: "string" },
                description: { type: "string" },
            },
            additionalProperties: false,
            required: ["amount", "category", "description"]
        });

        const valid = validate(budgetEntry);
        if (!valid) throw new Error(validate.errors[0].message);

        if (!oldUser.budget[year]) {
            oldUser.budget[year] = {}
        }
        if (!oldUser.budget[year][month]) {
            oldUser.budget[year][month] = []
        }

        const user = await userService.updateUser({
            ...oldUser,
            budget: {
                ...oldUser.budget,
                [year]: {
                    ...oldUser.budget[year],
                    [month]: [
                        ...oldUser.budget[year][month],
                        {
                            ...budgetEntry,
                            id: v4(),
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    ]
                }
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
)

export const updateBudgetEntry = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, budgetId } = event.pathParameters;
        // console.log({ id, budgetId });

        if (!id) throw new Error("User id is required");
        if (!budgetId) throw new Error("Entry id is required");


        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const { year, month } = event.queryStringParameters;
        // check if the month and year are numbers
        if (!year) throw new Error("Year is required");
        if (!month) throw new Error("Month is required");
        if (isNaN(Number(year))) throw new Error("Year must be a number");
        if (isNaN(Number(month))) throw new Error("Month must be a number");


        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const budgetEntry: BudgetEntry = event.body as unknown as BudgetEntry;
        if (!budgetEntry) throw new Error("Budget entry is required");

        // validate budget entry with ajv
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                amount: { type: "number" },
                category: { type: "string" },
                description: { type: "string" },
            },
            additionalProperties: false,
            required: ["amount", "category", "description"]
        });

        const valid = validate(budgetEntry);
        if (!valid) throw new Error(validate.errors[0].message);


        if (!oldUser.budget[year]) {
            throw new Error("Year and budgetId do not match")
        }
        if (!oldUser.budget[year][month]) {
            throw new Error("Month and budgetId do not match")
        }

        // check if the budget entry exists
        const budgetEntryExists = oldUser.budget[year][month].find(entry => entry.id === budgetId);
        if (!budgetEntryExists) throw new Error("Budget entry not found");

        const user = await userService.updateUser({
            ...oldUser,
            budget: {
                ...oldUser.budget,
                [year]: {
                    ...oldUser.budget[year],
                    [month]: oldUser.budget[year][month].map(entry => {
                        if (entry.id === budgetId) {
                            return {
                                ...budgetEntry,
                                id: budgetId,
                                createdAt: entry.createdAt,
                                updatedAt: new Date().toISOString()
                            }
                        }
                        return entry
                    })
                }
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
})

export const deleteBudgetEntry = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, budgetId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!budgetId) throw new Error("Entry id is required");

        if (!event.multiValueHeaders.auth_token) throw new Error("Auth token is required");
        checkAuth({ auth_token: event.multiValueHeaders.auth_token[0], id: id });

        const { year, month } = event.queryStringParameters;
        // check if the month and year are numbers
        if (!year) throw new Error("Year is required");
        if (!month) throw new Error("Month is required");
        if (isNaN(Number(year))) throw new Error("Year must be a number");
        if (isNaN(Number(month))) throw new Error("Month must be a number");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        if (!oldUser.budget[year]) {
            throw new Error("Year and budgetId do not match")
        }
        if (!oldUser.budget[year][month]) {
            throw new Error("Month and budgetId do not match")
        }

        // check if the budget entry exists
        const budgetEntryExists = oldUser.budget[year][month].find(entry => entry.id === budgetId);
        if (!budgetEntryExists) throw new Error("Budget entry not found");

        const user = await userService.updateUser({
            ...oldUser,
            budget: {
                ...oldUser.budget,
                [year]: {
                    ...oldUser.budget[year],
                    [month]: oldUser.budget[year][month].filter(entry => entry.id !== budgetId)
                }
            }
        });

        if (user.budget[year][month].length === 0) {
            delete user.budget[year][month]
        }
        if (Object.keys(user.budget[year]).length === 0) {
            delete user.budget[year]
        }
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
})