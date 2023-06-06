import {
  GET_ACCOUNTS,
  GET_FLOW_DATA,
  GET_HEALTH_DATA,
  GET_USAGE_DATA,
  GET_TOTAL_DATA,
} from "./types";
import { get } from "../library/Api";

export const getAccounts = () => async (dispatch) => {
  try {
    const res = await get("apis/account/overide_name/list");

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data.data.account_override_list,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFlowData = () => async (dispatch) => {
  try {
    const res = await get("apis/flow_health");

    dispatch({
      type: GET_FLOW_DATA,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getHealthData = () => async (dispatch) => {
  try {
    const res = await get("apis/system_battery");

    dispatch({
      type: GET_HEALTH_DATA,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsageData = (filter) => async (dispatch) => {
  try {
    const res = await get(`apis/system_usage?option=${filter}`);

    dispatch({
      type: GET_USAGE_DATA,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTotalData = () => async (dispatch) => {
  try {
    const res = await get(`apis/total_flow_demand?option=Past Month&interval=Days&number=1&system=total&class_code=PD`);
    dispatch({
      type: GET_TOTAL_DATA,
      payload: res.data.data.total_flow,
    });
  } catch (err) {
    console.log(err);
  }
};
