import BaseObject from "./BaseObject";
import BudgetEntry from "./BudgetEntry";

export default interface Budget extends BaseObject {
    year: number;
    budgets: BudgetEntry[]
}