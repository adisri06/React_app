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
  Dialog, DialogTitle, DialogContent, DialogActions, Button ,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Pagination from "./Pagination";
import { toast, ToastContainer } from "react-toastify"; // If not already imported
import "./DataTable.css";

const DataTable = ({ columns, data }) => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
  const rowsPerPage = 10;

  const searchableColumns = ["account", "fund"];

  /** Toggle Search Box Visibility */
  const toggleFilter = useCallback((key) => {
    if (key === "fund" && !filters["account"]) {
        toast.error("Enter Account to search for funds");
        return;
      }
    setShowFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  },  [filters]);

  /** Handle Search Filtering */
  const handleFilterChange = useCallback((value, key) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
  
      // If account is cleared, remove fund filter and hide fund search box
      if (key === "account" && value.trim() === "") {
        delete updatedFilters["fund"]; // Remove fund filter
        setShowFilters((prev) => ({ ...prev, fund: false })); // Hide fund input
      }
  
      return updatedFilters;
    });
  
    setPage(1); // Reset pagination on filter change
  }, []);
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };
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
    <ToastContainer hideProgressBar={false}  // Change to true if you don't want the progress bar
  closeOnClick
  pauseOnHover
  draggable
  closeButton={false} position="top-right" autoClose={3000} />
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
  {displayedData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} style={{ textAlign: "center", fontWeight: "bold", padding: "20px" }}>
        Account number not found
      </TableCell>
    </TableRow>
  ) : (
    displayedData.map((row) => (
      <TableRow key={row.key} className="hovered-row" onClick={() => handleRowClick(row)}>
        {columns.map((col) => (
          <TableCell key={col.key}>{row[col.dataIndex]}</TableCell>
        ))}
      </TableRow>
    ))
  )}
</TableBody>
        </Table>
        {dialogOpen && selectedRow && (
  <Dialog
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    maxWidth="xs" // Smaller dialog
    fullWidth
    PaperProps={{
      style: {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, 0%)",
        borderRadius: "10px",
      },
    }}
  >
    {/* 🔵 Custom Header with Close Button */}
    <DialogTitle
  style={{
    backgroundColor: "#1976D2",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px", // Adjust padding to prevent oversized title
    position: "relative", // Required for absolute close button
  }}
>
  Confirm Action
  <IconButton
    onClick={() => setDialogOpen(false)}
    sx={{ 
      position: "absolute", 
      top: 8, 
      right: 8, 
      width: 24, // Reduce button size
      height: 24, 
      padding: 0, // Remove extra padding
      color: "white", // Change icon color
    }}
  >
    <CloseIcon fontSize="small" /> {/* Reduce icon size */}
  </IconButton>
</DialogTitle>

    <DialogContent>
      <p>
        Do you want to open the details of <br />
        <strong>Account Number:</strong> {selectedRow.account} <br />
        <strong>Fund:</strong> {selectedRow.fund}
      </p>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => setDialogOpen(false)} style={{ backgroundColor: "green", color: "white" }}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          console.log("Selected Data:", selectedRow);
          setDialogOpen(false);
        }}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)}
      </TableContainer>

      <div className="pagination-wrapper">
        <Pagination currentPage={page} totalPages={Math.ceil(filteredData.length / rowsPerPage)} onPageChange={setPage} />
      </div>
    </>
  );
};

export default DataTable;