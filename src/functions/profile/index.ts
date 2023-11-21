import { handlerPath } from "@libs/handler-resolver";

const updateProfile = {
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

const updateFinancialDetails = {
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

const profileFunctions = {
    updateProfile,
    updateFinancialDetails
}
export default profileFunctions;