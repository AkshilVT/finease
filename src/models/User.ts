import Profile from "./Profile";
import BaseObject from "./BaseObject";
import FinancialDetails from "./FinancialDetails";
import Asset from "./Asset";
import Loans from "./Loans";
import Investment from "./Investment";
import Budget from "./Budget";

export default interface User extends BaseObject {
    username: string;
    profile: Profile;
    financial_details: FinancialDetails;
    assets: Asset[];
    budget: Budget;
    loans: Loans[];
    investments: Investment[];
}