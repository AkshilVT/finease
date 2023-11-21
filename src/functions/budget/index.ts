import { handlerPath } from "@libs/handler-resolver";

const addBudgetEntry = {
    handler: `${handlerPath(__dirname)}/handler.addBudgetEntry`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/budget'
            }
        }
    ]
}

const updateBudgetEntry = {
    handler: `${handlerPath(__dirname)}/handler.updateBudgetEntry`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/budget/{budgetId}'
            }
        }
    ]
};

const deleteBudgetEntry = {
    handler: `${handlerPath(__dirname)}/handler.deleteBudgetEntry`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'user/{id}/budget/{budgetId}'
            }
        }
    ]
};

const budgetFunctions = {
    addBudgetEntry,
    updateBudgetEntry,
    deleteBudgetEntry
}

export default budgetFunctions;