import Profile from "./Profile";
import BaseObject from "./BaseObject";
import FinancialDetails from "./FinancialDetails";
import Asset from "./Asset";
import Loans from "./Loans";
import Budget from "./BudgetEntry";
import Investment from "./Investment";

export default interface User extends BaseObject {
    profile: Profile;
    financial_details: FinancialDetails;
    assets: Asset[];
    budget: Budget[];
    loans: Loans[];
    investments: Investment[];
}