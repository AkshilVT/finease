import BaseObject from "./BaseObject";

export default interface Auth extends BaseObject {
    username: string;
    password: string;
}