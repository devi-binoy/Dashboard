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
  defs,
  linearGradient,
  stop,
} from "recharts";

const GraphComponent = () => {
  const totalData = useSelector((state) => state.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalData());
  }, []);

  const chartData = Object.values(totalData).flatMap((accountData, index) => {
    const accountName = `Account ${index + 1}`;
    return Object.values(accountData).flatMap((dataObj) => {
      return {
        account_name: accountName,
        flow: dataObj?.flow,
        option: dataObj?.option,
      };
    });
  });

  const uniqueAccounts = Array.from(new Set(chartData.map((data) => data?.account_name)));
  const uniqueOptions = Array.from(new Set(chartData.map((data) => data?.option)));

  const series = uniqueAccounts.map((accountName, index) => {
    const data = uniqueOptions.map((option) => {
      const filteredData = chartData.filter(
        (d) => d.account_name === accountName && d.option === option
      );
      return filteredData.length > 0 ? filteredData[0].flow : 0;
    });

    return {
      name: accountName,
      data: data,
    };
  });

  return (
    <div className="total-card">
      <h2 className="card-title">Area Graph</h2>
      <AreaChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" />
        <YAxis />
        <Tooltip />
        {series.map((data, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={`data[${index}]`}
            stroke={index === 0 ? "#8884d8" : "#82ca9d"}
            fillOpacity={1}
            fill={index === 0 ? "url(#colorUv)" : "url(#colorPv)"}
          />
        ))}
      </AreaChart>
    </div>
  );
};

export default GraphComponent;
