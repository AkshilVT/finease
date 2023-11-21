import { handlerPath } from '@libs/handler-resolver';
import profileFunctions from './profile';
import assetFunctions from './asset';
import budgetFunctions from './budget';
import loanFunctions from './loan';
import investmentFunctions from './investment';

const createUser = {
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

const getUser = {
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

const functions = {
    createUser,
    getUser,
    ...profileFunctions,
    ...assetFunctions,
    ...budgetFunctions,
    ...loanFunctions,
    ...investmentFunctions
}
export default functions