import React, { useState, useRef, useEffect, useCallback } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "./Pagination";
import "./DataTable.css";

const DataTable = ({ columns, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const columnRefs = useRef({});
  const [columnWidths, setColumnWidths] = useState({});
  const timerRef = useRef({});

  const searchableColumns = ["account", "fund"];

  const handleActionClick = useCallback((action, row) => {
    console.log(`API called for ${action}`);
    console.log("Row Data:", row);
  }, []);

  useEffect(() => {
    const widths = {};
    Object.keys(columnRefs.current).forEach((key) => {
      if (columnRefs.current[key]) {
        widths[key] = `${columnRefs.current[key].offsetWidth}px`;
      }
    });
    setColumnWidths(widths);
  }, [columns, data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".table-container")) {
        setShowFilters({});
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleFilter = useCallback((key) => {
    setShowFilters((prev) => {
      const newState = { ...prev, [key]: !prev[key] };

      if (newState[key]) {
        clearTimeout(timerRef.current[key]);
        timerRef.current[key] = setTimeout(() => {
          if (!filters[key]) {
            setShowFilters((prev) => ({ ...prev, [key]: false }));
          }
        }, 10000);
      }

      return newState;
    });
  }, [filters]);

  const handleFilterChange = useCallback((value, key) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (value) {
      clearTimeout(timerRef.current[key]);
    } else {
      timerRef.current[key] = setTimeout(() => {
        setShowFilters((prev) => ({ ...prev, [key]: false }));
      }, 5000);
    }

    const newData = data.filter((row) =>
      Object.keys(newFilters).every((col) =>
        row[col]?.toString().toLowerCase().includes(newFilters[col]?.toLowerCase() || "")
      )
    );
    setFilteredData(newData);
    setPage(1);
  }, [data, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} ref={(el) => (columnRefs.current[col.dataIndex] = el)} className="blue-header">
                  <div className="header-content">
                    <strong>{col.title}</strong>
                    {searchableColumns.includes(col.dataIndex) && (
                      <IconButton size="small" className="search-icon" onClick={() => toggleFilter(col.dataIndex)}>
                        <SearchIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    )}
                  </div>
                  {showFilters[col.dataIndex] && (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder={`${col.title}`}
                      value={filters[col.dataIndex] || ""}
                      onChange={(e) => handleFilterChange(e.target.value, col.dataIndex)}
                      className="dynamic-input search-bar-white"
                      style={{ width: columnWidths[col.dataIndex] || "100%" }}
                     
                    />
                  )}
                </TableCell>
              ))}
              <TableCell className="blue-header">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {displayedData.map((row) => (
              <TableRow key={row.key} className="hovered-row">
                {columns.map((col) => (
                  <TableCell key={col.key}>{row[col.dataIndex]}</TableCell>
                ))}
                <TableCell className="table-cell-actions">
                  <IconButton size="small" className="action-btn" title="View" onClick={() => handleActionClick("View", row)}>
                    <SearchIcon style={{ fontSize: "16px" }} />
                  </IconButton>
                  <IconButton size="small" className="action-btn" title="Modify" onClick={() => handleActionClick("Modify", row)}>
                    <EditIcon style={{ fontSize: "16px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-wrapper">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
};

export default DataTable;