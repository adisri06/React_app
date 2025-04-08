
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Pagination from "../nachaTable/Pagination";
import useFetch from "../AmountTotalTable/useFetch";
import mockData from "./mockdata";
import "./AccountTable.scss";

const rowsPerPage = 10;

const AccountTable = () => {
  const { data, loading, error } = useFetch("https://api.example.com/accounts", mockData);
  const [page, setPage] = useState(1);
  const tableHeaders = ["Account", "Fund", "Amount"];
  
  const displayedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className="table-containers">
        <Table>
          <TableHead>
          <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header} className="table-header text-right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={3} className="text-right">Loading...</TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={3} className="text-right">{error}</TableCell>
    </TableRow>
  ) : data.length === 0 ? (
    <TableRow>
      <TableCell colSpan={3} className="text-center">End of Data</TableCell>
    </TableRow>
  ) : (
    displayedData.map((row) => (
      <TableRow key={row.key}>
        <TableCell className="text-right">{row.account}</TableCell>
        <TableCell className="text-right">{row.fund}</TableCell>
        <TableCell className="text-right">{row.amount}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>
        </Table>
      </TableContainer>

      <div className="totals-box">
        <span >Total:</span>
        <span >Accounts: {data.length}</span>
        <span >Amount: {data.reduce((sum, row) => sum + parseFloat(row.amount), 0).toFixed(2)}</span>
      </div>

      {data.length > rowsPerPage && (
        <div className="pagination-wrapper">
          <Pagination currentPage={page} totalPages={Math.ceil(data.length / rowsPerPage)} onPageChange={setPage} />
        </div>
      )}
    </>
  );
};

export default AccountTable;
