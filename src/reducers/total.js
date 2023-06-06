import { GET_TOTAL_DATA } from "../actions/types";

const initialState = {
  account_name: " ",
  flow: 0,
  flow_date: " ",
  flow_date_check: " ",
  flow_time: 0,
  option: " ",
  option_month: " ",
};

function totalFlowReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TOTAL_DATA:
      return payload;

    default:
      return state;
  }
}

export default totalFlowReducer;