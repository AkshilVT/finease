import BaseObject from "./BaseObject";

export default interface BudgetEntry extends BaseObject {
    name: string;
    description: string;
    month: string;
    amount: number;
}