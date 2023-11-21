import BudgetEntry from "./BudgetEntry";

export default interface Budget {
    [year: number]: {
        [month: number]: BudgetEntry[];
    };
}
