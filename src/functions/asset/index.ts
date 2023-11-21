import { handlerPath } from "@libs/handler-resolver";

const addAsset = {
    handler: `${handlerPath(__dirname)}/handler.addAsset`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/asset'
            }
        }
    ]
}

const updateAsset = {
    handler: `${handlerPath(__dirname)}/handler.updateAsset`,
    events: [
        {
            http: {
                method: 'post',
                path: 'user/{id}/asset/{assetId}'
            }
        }
    ]
};

const deleteAsset = {
    handler: `${handlerPath(__dirname)}/handler.deleteAsset`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'user/{id}/asset/{assetId}'
            }
        }
    ]
};

const assetFunctions = {
    addAsset,
    updateAsset,
    deleteAsset
}
export default assetFunctions;