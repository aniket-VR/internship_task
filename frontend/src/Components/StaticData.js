import React, { useEffect, useState } from "react";
import { Month } from "../Utils/data";
import { AxiosBase } from "../Utils/auth";
import Box from "@mui/material/Box";

import LoadingButton from "@mui/lab/LoadingButton";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MonthSelector from "./MonthSelector";
export default function StaticData() {
  const [month, setMonth] = useState("03");
  const [loading, setLoading] = useState(true);

  const [staticData, setStatic] = useState({
    totalSaleAmount: 0,
    totalSold: 0,
    totalNotSold: 0,
  });
  const newMonth = Month;
  const getStaticResult = async () => {
    try {
      const resultT = await AxiosBase.get("/transcation/statistics", {
        params: {
          month,
        },
      });
      var resultJson = JSON.parse(resultT.data);
      console.log(resultJson);
      if (resultJson.status) {
        setStatic({
          totalSaleAmount: resultJson.totalSaleAmount,
          totalSold: resultJson.totalSold,
          totalNotSold: resultJson.totalNotSold,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getStaticResult();
  }, [month]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-row gap-2">
        <h1 className="text-5xl font-bold">{`Bar Chart Stats - ${newMonth[month]} `}</h1>
        <MonthSelector month={month} setMonth={setMonth} />
      </div>
      <div>
        {loading ? (
          <div className="text-xl font-bold justify-center items-center">
            loading...
          </div>
        ) : (
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Total Sale
                      </TableCell>
                      <TableCell align="right">
                        {staticData.totalSaleAmount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Total Sold Item
                      </TableCell>
                      <TableCell align="right">
                        {staticData.totalSold}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Total Not Sold Item
                      </TableCell>
                      <TableCell align="right">
                        {staticData.totalNotSold}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}
      </div>
    </div>
  );
}
