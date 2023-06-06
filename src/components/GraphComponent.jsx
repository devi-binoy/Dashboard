import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalData } from "../actions/actions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GraphComponent = () => {
  const totalData = useSelector((state) => state.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalData());
  }, []);

  const chartData = Object.values(totalData).flatMap((dayData, index) => {
    return Object.values(dayData).flatMap((companyDayObj) => {
      return {
        account_name: companyDayObj?.account_name,
        flow: companyDayObj?.flow,
        option: companyDayObj?.option,
      };
    });
  });

  const transformedData = {};

  chartData.forEach((dataPoint) => {
    const { account_name, flow, option } = dataPoint;
    if (!transformedData[option]) {
      transformedData[option] = {};
    }
    if (!transformedData[option][account_name]) {
      transformedData[option][account_name] = 0;
    }
    transformedData[option][account_name] += flow;
  });

  const formattedData = Object.entries(transformedData).map(([option, data]) => {
    return {
      option,
      ...data,
    };
  });

  const uniqueAccounts = Array.from(
    new Set(chartData.map((data) => data?.account_name))
  );

  const colors = ["#439A97", "#62B6B7", "#97DECE", "#CBEDD5"];

  return (
    <div className="total-card">
      <h2 className="card-title">Total Flow</h2>
      <AreaChart
        width={1000}
        height={500}
        data={formattedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" />
        <YAxis />
        <Tooltip />
        <Legend />
        {uniqueAccounts.map((accountName, index) => (
          <Area
            key={accountName}
            type="monotone"
            dataKey={accountName}
            stackId="1"
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            name={accountName}
          />
        ))}
      </AreaChart>
    </div>
  );
};

export default GraphComponent;
