import { combineReducers } from "redux";
import accounts from "./accounts";
import flow from "./flow";
import status from "./status";
import usage from "./usage";
import total from "./total";

export default combineReducers({
  accounts,
  flow,
  status,
  usage,
  total,
});