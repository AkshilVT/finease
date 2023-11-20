import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../models/User";

export default class UserService {

    private TableName: string = "finease_user";

    constructor(private docClient: DocumentClient) { }

    async createUser(user: User): Promise<User> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: user
        }).promise();
        return user as User;
    }

    async getUser(id: string): Promise<User> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { id }
        }).promise();
        return result.Item as User;
    }

    async updateUser(user: User): Promise<User> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: user
        }).promise();
        return user as User;
    }

    async deleteUser(id: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.TableName,
            Key: { id }
        }).promise();
    }
}