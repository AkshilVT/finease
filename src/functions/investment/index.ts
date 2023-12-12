import { handlerPath } from "@libs/handler-resolver";

const addInvestment = {
    handler: `${handlerPath(__dirname)}/handler.addInvestment`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'post',
                path: 'user/{id}/investment'
            }
        }
    ]
}

const updateInvestment = {
    handler: `${handlerPath(__dirname)}/handler.updateInvestment`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'post',
                path: 'user/{id}/investment/{investmentId}'
            }
        }
    ]
};

const deleteInvestment = {
    handler: `${handlerPath(__dirname)}/handler.deleteInvestment`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'delete',
                path: 'user/{id}/investment/{investmentId}'
            }
        }
    ]
};

const investmentFunctions = {
    addInvestment,
    updateInvestment,
    deleteInvestment
}
export default investmentFunctions;