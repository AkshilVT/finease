import BaseObject from "./BaseObject";

export default interface Investment extends BaseObject {
    name: string;
    description: string;
    type_of_investment: string;
    amount: string;
    date_of_acquisition: Date;
    date_of_return: Date;
    apy: number
}