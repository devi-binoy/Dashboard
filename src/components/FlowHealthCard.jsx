import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlowData } from "../actions/actions";
import { Pie } from "react-chartjs-2";
import { useCallback } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function FlowHealthCard() {
  const [error, setError] = useState();

  const flowData = useSelector((state) => state.flow.flow_data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlowData());
  }, []);


  const createChartData = useCallback(() => {
    if (flowData) {
      return {
        labels: ["Backflow", "Leak", "No issue", "No recent flow"],
        datasets: [
          {
            label: "meters",
            data: [
              flowData.backflow,
              flowData.leak,
              flowData.no_issue,
              flowData.no_recent_flow,
            ],
            backgroundColor: ["#439A97", "#97DECE", "#62B6B7", "#CBEDD5"],
          },
        ],
        options: {
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
        },
      };
    }
    return null;
  },[flowData])

  return (
    <div className="card flow-status-card">
      <h2 className="card-title">Flow Health</h2>
      {error ? (
        <p>Error fetching flow status data: {error}</p>
      ) : flowData ? (
        <Pie className="donut" data={createChartData()} />
      ) : (
        <p>Loading flow status data...</p>
      )}
      <>
        {error ? (
          <p>Error fetching flow status data: {error}</p>
        ) : flowData ? (
          <div className="label-box">
            <div className="info">
              <div
                className="color"
                style={{ backgroundColor: "#439A97" }}
              ></div>
              <p className="label">Backflow</p>
              <p className="value">{flowData.backflow}</p>
            </div>
            <div className="info">
              <div
                className="color"
                style={{ backgroundColor: "#97DECE" }}
              ></div>
              <p className="label">Leak</p>
              <p className="value">{flowData.leak}</p>
            </div>
            <div className="info">
              <div
                className="color"
                style={{ backgroundColor: "#CBEDD5" }}
              ></div>
              <p className="label">No Recent Flow</p>
              <p className="value">{flowData.no_recent_flow}</p>
            </div>
            <div className="info">
              <div
                className="color"
                style={{ backgroundColor: "#62B6B7" }}
              ></div>
              <p className="label">No Issues</p>
              <p className="value">{flowData.no_issue}</p>
            </div>
          </div>
        ) : (
          <p>Loading flow status data...</p>
        )}
      </>
    </div>
  );
}

export default FlowHealthCard;
