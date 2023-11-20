import BaseObject from "./BaseObject";

export default interface Asset extends BaseObject {
    name: string;
    description: string;
    date_of_purchase: Date;
    cost: number;
    value: number;
    apy: number;
}