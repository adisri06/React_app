/** @format */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Pagination from "./Pagination";
import "./DataTable.css";

const DataTable = ({ columns, data }) => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const searchableColumns = ["account", "fund"];

  /** Toggle Search Box Visibility */
  const toggleFilter = useCallback((key) => {
    setShowFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /** Handle Search Filtering */
  const handleFilterChange = useCallback((value, key) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset pagination on filter change
  }, []);

  /** Memoized Filtered Data */
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.keys(filters).every((col) =>
        row[col]?.toString().toLowerCase().includes(filters[col]?.toLowerCase() || "")
      )
    );
  }, [data, filters]);

  /** Paginate Displayed Data */
  const displayedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} className="blue-header">
  <div className="header-content">
    <strong>{col.title}</strong>

    {searchableColumns.includes(col.dataIndex) && (
      <div className="search-icon-wrapper">
        <IconButton size="small" className="icon-btn" onClick={() => toggleFilter(col.dataIndex)}>
          <SearchIcon />
          {showFilters[col.dataIndex] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </div>
    )}
  </div>

  {showFilters[col.dataIndex] && (
    <div className="search-container">
      <TextField
        variant="outlined"
        size="small"
        placeholder={`Search ${col.title}`}
        value={filters[col.dataIndex] || ""}
        onChange={(e) => handleFilterChange(e.target.value, col.dataIndex)}
        className="search-bar-white"
        InputProps={{
            style: { fontSize: '12px' }, // Reduces font size globally
          }}
      />
    </div>
  )}
</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.key} className="hovered-row">
                {columns.map((col) => (
                  <TableCell key={col.key}>{row[col.dataIndex]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-wrapper">
        <Pagination currentPage={page} totalPages={Math.ceil(filteredData.length / rowsPerPage)} onPageChange={setPage} />
      </div>
    </>
  );
};

export default DataTable;