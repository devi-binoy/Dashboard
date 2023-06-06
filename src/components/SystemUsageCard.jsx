import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleArrowDown,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUsageData } from "../actions/actions";



function SystemUsageCard() {

  const [filter, setFilter] = useState("week");

  const systemUsage = useSelector((state) => state.usage.systemusage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsageData(filter));
  }, [filter]);

  
  const getArrowIcon = useCallback(() => {
    const { percentage_arrow_down } = systemUsage || {};
    if (percentage_arrow_down) {
      return (
        <FontAwesomeIcon
          icon={faCircleArrowDown}
          style={{ color: "#8BC83B", height: "7rem" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faCircleArrowUp}
          style={{ color: "#DE5C5C", height: "7rem" }}
        />
      );
    }
  },[systemUsage]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilterText = () => {
    switch (filter) {
      case "week":
        return "Weekly";
      case "month":
        return "Monthly";
      case "year":
        return "Yearly";
      case "Last%20Week":
        return "Last 7 Days";
      case "Last%20Month":
        return "Last 30 Days";
      case "Last%20Year":
        return "Last 365 Days";
      default:
        return "";
    }
  };

  const getUnit = () => {
    if (["week", "month", "year"].includes(filter)) {
      return getFilterText().toLowerCase().slice(0, -2);
    } else {
      return getFilterText().slice(5);
    }
    return systemUsage?.flow_unit;
  };

  const getThisText = () => {
    if (["week", "month", "year"].includes(filter)) {
      return "This";
    }
    return "";
  };

  const getPrevText = () => {
    if (["week", "month", "year"].includes(filter)) {
      return "Previous";
    } else {
      return "";
    }
  };

  const getSmallArrowIcon = () => {
    const { percentage_arrow_down } = systemUsage || {};
    if (percentage_arrow_down) {
      return (
        <FontAwesomeIcon
          icon={faSortDown}
          style={{ color: "#8BC83B", height: "1.5em" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faSortUp}
          style={{ color: "#DE5C5C", height: "1.5em" }}
        />
      );
    }
  };

  return (
    <div className="card sys-usage-card">
      <h2 className="card-title">System Water Usage</h2>
      <div className="filter-dropdown">
        <label htmlFor="filter">Select Filter:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="Last%20Week">Last 7 Days</option>
          <option value="Last%20Month">Last 30 Days</option>
          <option value="Last%20Year">Last 365 Days</option>
        </select>
      </div>
      <h3 className="usage-data">
        {getFilterText()} Usage* ({systemUsage?.flow_unit}/{getUnit()})
      </h3>
      <h6 className="metric-msg">
        *This metric is calculated from networked meters only.
      </h6>
      <div className="metric-boxes">
        <div className="metric now-metric">
          <h4>
            {getThisText()}{" "}
            {["week", "month", "year"].includes(filter)
              ? getFilterText().toLowerCase().slice(0, -2)
              : getFilterText()}
          </h4>
          <h3 className="value">{systemUsage?.flow}</h3>
          <h6 className="unit">
            {systemUsage?.flow_unit}/{getUnit()}
          </h6>
        </div>
        <div className="metric prev-metric">
          <h4>
            {getPrevText()}{" "}
            {["week", "month", "year"].includes(filter)
              ? getFilterText().toLowerCase().slice(0, -2)
              : "Previous Data"}
          </h4>
          <h3 className="value">{systemUsage?.flow_pre}</h3>
          <h6 className="unit">
            {systemUsage?.flow_unit}/{getUnit()}
          </h6>
        </div>
      </div>
      <div className="change">
        {getArrowIcon()}
        <div className="change-per">
          <p>{systemUsage?.percentage} </p>
          <span className="arrow-small">{getSmallArrowIcon()}</span>
        </div>
      </div>
    </div>
  );
}

export default SystemUsageCard;
