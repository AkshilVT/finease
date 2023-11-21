import BaseObject from "./BaseObject";

export default interface BudgetEntry extends BaseObject {
    category: string;
    description: string;
    amount: number;
}