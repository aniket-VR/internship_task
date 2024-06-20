import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MonthSelector from "../Components/MonthSelector";
import { AxiosBase } from "../Utils/auth";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useDebounce } from "../Hooks/useDebounce";

export default function HomePage() {
  const [month, setMonth] = useState("03");
  const [page, setPage] = useState(1);
  const [searchQ, setSearchQ] = useState("");
  const debouncedSearch = useDebounce(searchQ);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    try {
      const resultT = await AxiosBase.get("/transcation", {
        params: {
          month,
          page,
          search: debouncedSearch,
        },
      });
      var resultJson = JSON.parse(resultT.data);
      console.log(resultJson);
      if (resultJson.status) {
        setResult(resultJson.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, [debouncedSearch]);

  useEffect(() => {
    setLoading(true);
    getResult();
  }, [month, page]);
  return (
    <div className="my-5 mx-10">
      <div className="flex flex-row items-center justify-between">
        <div className="w-[50%]  flex flex-row items-center border-[2px] border-solid border-gray-500">
          <SearchIcon className="ml-3 my-3" />

          <input
            className="ml-2 my-3 w-full focus:outline-none text-xl"
            placeholder="Search…"
            type="text"
            value={searchQ}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchQ(e.target.value);
            }}
          />
        </div>

        <MonthSelector month={month} setMonth={setMonth} />
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            className="overflow-hidden scroll-my-4"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title&nbsp;(g)</TableCell>
                <TableCell align="right">Description&nbsp;(g)</TableCell>
                <TableCell align="right">Price&nbsp;(g)</TableCell>
                <TableCell align="right">Category&nbsp;(g)</TableCell>
                <TableCell align="right">Sold&nbsp;(g)</TableCell>
                <TableCell align="right">Image&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.sold ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">{row.image}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="flex mt-5 flex-row justify-between">
        <span>{`Page No -${page}`}</span>
        <span className="flex flex-row gap-2">
          <Button
            variant="contained"
            onClick={() => {
              if (page - 1 > 0) {
                setPage(page - 1);
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (result.length !== 0) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </Button>
        </span>
        <span>Per Page 10</span>
      </div>
    </div>
  );
}
