import { handlerPath } from '@libs/handler-resolver';

export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user'
            }
        }
    ]
};

export const getUser = {
    handler: `${handlerPath(__dirname)}/handler.getUser`,
    events: [
        {
            http: {
                method: 'get',
                path: 'user/{id}'
            }
        }
    ]
};

export const updateProfile = {
    handler: `${handlerPath(__dirname)}/handler.updateProfile`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/profile'
            }
        }
    ]
};

export const updateFinancialDetails = {
    handler: `${handlerPath(__dirname)}/handler.updateFinancialDetails`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/financial-details'
            }
        }
    ]
};