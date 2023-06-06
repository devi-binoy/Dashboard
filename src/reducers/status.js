import { GET_HEALTH_DATA } from '../actions/types';

const initialState = {
    comm_status: 0,
    data_status: 0,
    device_status: 0,
    last: null,
    next: null,
    status: false,
    system_health: 0,
    updated_by: null
};

function statusReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HEALTH_DATA:
      return payload;

    default:
      return state;
  }
}

export default statusReducer;
