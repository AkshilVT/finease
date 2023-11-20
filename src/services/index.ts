
import dynamoDBClient from "../models";
import UserService from "./service";
const userService = new UserService(dynamoDBClient());
export default userService;