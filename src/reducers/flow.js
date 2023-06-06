import { GET_FLOW_DATA } from '../actions/types';

const initialState = {
  backflow: 0,
  backflow_per: 0,
  leak: 0,
  leak_per: 0,
  no_issue: 0,
  no_issue_per: 0,
  no_recent_flow: 0,
  no_recent_per: 0
};

function flowDataReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FLOW_DATA:
      return payload;

    default:
      return state;
  }
}

export default flowDataReducer;
