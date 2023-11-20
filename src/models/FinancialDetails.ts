import BaseObject from "./BaseObject";
import Income from "./Income";
import Insurance from "./Insurance";

export default interface FinancialDetails extends BaseObject {
    incomes: Income;
    insurance: Insurance;
}