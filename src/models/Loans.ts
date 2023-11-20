import BaseObject from "./BaseObject";

export default interface Loan extends BaseObject {
    name: string;
    description: string;
    principle: number;
    rate: number;
    time: number;
    date_of_purchase: number;
}