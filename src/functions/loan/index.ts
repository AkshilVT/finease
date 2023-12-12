import { handlerPath } from "@libs/handler-resolver";


const addLoan = {
    handler: `${handlerPath(__dirname)}/handler.addLoan`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'post',
                path: 'user/{id}/loan'
            }
        }
    ]
}

const updateLoan = {
    handler: `${handlerPath(__dirname)}/handler.updateLoan`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'post',
                path: 'user/{id}/loan/{loanId}'
            }
        }
    ]
};

const deleteLoan = {
    handler: `${handlerPath(__dirname)}/handler.deleteLoan`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
                method: 'delete',
                path: 'user/{id}/loan/{loanId}'
            }
        }
    ]
};

const loanFunctions = {
    addLoan,
    updateLoan,
    deleteLoan
}
export default loanFunctions;