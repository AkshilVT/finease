import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Loan from "src/models/Loans";
import userService from "src/services";
import Ajv from "ajv";

export const addLoan = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id } = event.pathParameters;
        if (!id) throw new Error("User id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const loan: Loan = event.body as unknown as Loan;
        if (!loan) throw new Error("Loan is required");

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

        const valid = validate(loan);
        if (!valid) throw new Error(validate.errors[0].message);

        const user = await userService.updateUser({
            ...oldUser,
            loans: [
                ...oldUser.loans,
                {
                    ...loan,
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

export const updateLoan = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, loanId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!loanId) throw new Error("Loan id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        const loan: Loan = event.body as unknown as Loan;
        if (!loan) throw new Error("Loan is required");

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

        const valid = validate(loan);
        if (!valid) throw new Error(validate.errors[0].message);

        const user = await userService.updateUser({
            ...oldUser,
            loans: oldUser.loans.map(l => l.id === loanId ? {
                ...loan,
                id: loanId,
                updatedAt: new Date().toISOString()
            } : l)
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

export const deleteLoan = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, loanId } = event.pathParameters;
        if (!id) throw new Error("User id is required");
        if (!loanId) throw new Error("Loan id is required");

        const oldUser = await userService.getUser(id);
        if (!oldUser) throw new Error("User not found");

        // check if loan exists
        const loan = oldUser.loans.find(l => l.id === loanId);
        if (!loan) throw new Error("Loan not found");

        const user = await userService.updateUser({
            ...oldUser,
            loans: oldUser.loans.filter(l => l.id !== loanId)
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