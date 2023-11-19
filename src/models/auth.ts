import BaseObject from "./baseObject";

export default interface Auth extends BaseObject {
    username: string;
    password: string;
}