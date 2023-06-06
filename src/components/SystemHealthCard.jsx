import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getHealthData } from "../actions/actions";



function SystemHealthCard() {

  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHealthData());
  }, []);

  const getStatusColor = (value) => {
    if (value >= 80) {
      return "#50c878";
    } else if (value >= 60) {
      return "#F3CB4A";
    } else {
      return "#F3654A";
    }
  };

  const getStatusLabel = (value) => {
    if (value >= 80) {
      return "Healthy!";
    } else if (value >= 60) {
      return "Alarming";
    } else {
      return "Defective!";
    }
  };

  const getStatusIcon = (value) => {
    if (value >= 80) {
      return (
        <FontAwesomeIcon
          className="status-icon"
          icon={faCircleCheck}
          style={{ color: "#50c878", height: "1.25rem" }}
        />
      );
    } else if (value >= 60) {
      return (
        <FontAwesomeIcon
          className="status-icon"
          icon={faCircleExclamation}
          style={{ color: "#F3CB4A", height: "1.25rem" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          className="status-icon"
          icon={faCircleXmark}
          style={{ color: "#F3654A", height: "1.25rem" }}
        />
      );
    }
  };

  return (
    <div className="card sys-health-card">
      <h2 className="card-title">System Health</h2>
      <div id="wrapper" className="heart">
        <div className="update-time">
          <span className="update">Last Update: {status?.last}</span>
          <span className="update">Next Update: {status?.next}</span>
        </div>
        <div
          id="pulsingheart"
          style={{
            color: getStatusColor(status?.system_health),
            animation: "pulse 1s infinite",
          }}
        ></div>
        <h3>Status: {getStatusLabel(status?.system_health)}</h3>
      </div>
      <div className="status">
        <div className="status-val">
          <h5>Communication Status</h5>
          {getStatusIcon(status?.comm_status)}
        </div>
        <div className="status-val">
          <h5>Device Status</h5>
          {getStatusIcon(status?.device_status)}
        </div>
        <div className="status-val">
          <h5>Data Status</h5>
          {getStatusIcon(status?.data_status)}
        </div>
      </div>
    </div>
  );
}

export default SystemHealthCard;
