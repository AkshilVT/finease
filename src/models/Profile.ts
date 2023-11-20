import BaseObject from "./BaseObject";

export default interface Profile extends BaseObject {
    name: string;
    dob: Date;
    occupation: string;
    marital_status: string;
    email: string;
    phone_number: number;
}