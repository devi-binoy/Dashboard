import React from "react";
import { Link } from "react-router-dom";
import FlowHealthCard from "./FlowHealthCard";
import SystemHealthCard from "./SystemHealthCard";
import SystemUsageCard from "./SystemUsageCard";
import FlowDemand from "./TotalFlow";
import Navbar from "./Navbar";
import GraphComponent from "./GraphComponent";

const Dashboard = () => {
  return (
    <>
      {!localStorage.getItem("loggedIn") ? (
        <div className="center">
          <div className="alert-box">
            <div className="alert-icon">&#9888;</div>
            <h1>You Do Not Have Access</h1>
            <Link to="/">
              <button className="signin-button">Sign In</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
         <Navbar name="Dashboard" />
        <div className="dashboard">
          <SystemHealthCard />
          <FlowHealthCard />
          <SystemUsageCard />
          {/* <FlowDemand /> */}
          <GraphComponent />
        </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
