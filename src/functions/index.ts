import { handlerPath } from '@libs/handler-resolver';
import profileFunctions from './profile';

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
    ...profileFunctions
}
export default functions