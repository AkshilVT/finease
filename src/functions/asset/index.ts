import { handlerPath } from "@libs/handler-resolver";

const addAsset = {
    handler: `${handlerPath(__dirname)}/handler.addAsset`,
    events: [
        {
            http: {
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
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
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
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
                cors: {
                    origin: '*',
                    headers: ['Content-Type', 'Authorization'],
                    allowCredentials: true,
                },
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