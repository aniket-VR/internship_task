import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { AxiosBase } from "../Utils/auth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MonthSelector from "./MonthSelector";
import { Month } from "../Utils/data";
var priceRange = [
  {
    count: 7,
    range: "0-100",
  },
  {
    count: 5,
    range: "101-200",
  },
  {
    count: 1,
    range: "201-300",
  },
  {
    count: 2,
    range: "301-400",
  },
  {
    count: 50,
    range: "401-500",
  },
  {
    count: 2,
    range: "501-600",
  },
  {
    count: 5,
    range: "601-700",
  },
  {
    count: 1,
    range: "701-800",
  },
  {
    count: 3,
    range: "801-900",
  },
  {
    count: 4,
    range: "901-Above",
  },
];

export default function BarChartT() {
  const [month, setMonth] = useState("03");
  const [result, setResult] = useState(priceRange);
  const [loading, setLoading] = useState(true);
  const newMonth = Month;

  const getBarResult = async () => {
    try {
      const resultT = await AxiosBase.get("/transcation/barchart", {
        params: {
          month,
        },
      });
      var resultJson = JSON.parse(resultT.data);
      console.log(resultJson);
      if (resultJson.status) {
        var i = 0;

        console.log(resultJson.status);
        for (var item of resultJson.data) {
          priceRange[i].count = item.count;
          i++;
        }
        console.log(priceRange);
        setResult(priceRange);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getBarResult();
  }, [month]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-row gap-2">
        <h1 className="text-5xl font-bold">{`Bar Chart Stats - ${newMonth[month]} `}</h1>

        <MonthSelector month={month} setMonth={setMonth} />
      </div>
      {loading ? (
        <div className="text-xl font-bold justify-center items-center">
          loading...
        </div>
      ) : (
        <BarChart width={900} height={400} data={result}>
          <XAxis dataKey={"range"} className="font-bold" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="count" barSize={50} fill="#8878d8" />
        </BarChart>
      )}
    </div>
  );
}

// Filename - App.js
