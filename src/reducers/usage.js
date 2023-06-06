import { GET_USAGE_DATA } from "../actions/types";

const initialState = {
  flow: null,
  flow_pre: null,
  flow_unit: null,
  percentage: null,
  percentage_arrow_down: true,
  pre_range: null,
  this_range: null,
};

function usageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USAGE_DATA:
      return payload;

    default:
      return state;
  }
}

export default usageReducer;
