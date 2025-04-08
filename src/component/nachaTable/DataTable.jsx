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
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Pagination from "./Pagination";
import "./DataTable.css";

const DataTable = ({ columns, data }) => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const rowsPerPage = 10;

  /** Toggle Search Box Visibility (Only for Account) */
  const toggleFilter = useCallback((key) => {
    setShowFilters((prev) => {
      const updatedFilters = { ...prev, [key]: !prev[key] };
  
      // If account search is closed, also close fund search & clear filters
      if (key === "account" && !updatedFilters.account) {
        updatedFilters.fund = false; // Hide Fund search
        setFilters((prev) => ({ ...prev, account: "", fund: "" })); // Clear both filters
      }
  
      return updatedFilters;
    });
  }, []);

  /** Handle Search Filtering */
  const handleFilterChange = useCallback((value, key) => {
    if (key === "account" && !/^\d*$/.test(value)) return; // Allow only numbers for Account
  
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
  
      if (key === "account") {
        const hasResults = data.some((row) => row.account?.toString().startsWith(value));
        setShowFilters((prev) => ({ ...prev, fund: value.trim() !== "" && hasResults })); // Show Fund only if valid
      }
  
      return updatedFilters;
    });
  
    setPage(1); // Reset pagination on filter change
  }, [data]);

  /** Memoized Filtered Data */
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.keys(filters).every((col) =>
        row[col]?.toString().toLowerCase().startsWith(filters[col]?.toLowerCase() || "")
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

          {col.dataIndex === "account" && (
            <div className="search-icon-wrapper">
              <IconButton size="small" className="icon-btn" onClick={() => toggleFilter(col.dataIndex)}>
                <SearchIcon />
                {showFilters[col.dataIndex] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </div>
          )}
        </div>

        {/* Account Search Input */}
        {showFilters[col.dataIndex] && col.dataIndex === "account" && (
          <div className="search-container">
            <TextField
              variant="outlined"
              size="small"
              placeholder={`Search ${col.title}`}
              value={filters[col.dataIndex] || ""}
              onChange={(e) => handleFilterChange(e.target.value, col.dataIndex)}
              className="search-bar-white"
              InputProps={{ style: { fontSize: "12px" } }}
            />
          </div>
        )}

        {/* Fund Search Input - Ensures it's only shown in the "Fund" column */}
        {col.dataIndex === "fund" && showFilters.fund && (
          <div className="search-container">
            <TextField
              variant="outlined"
              size="small"
              placeholder={`Search ${col.title}`}
              value={filters.fund || ""}
              onChange={(e) => handleFilterChange(e.target.value, "fund")}
              className="search-bar-white"
              InputProps={{ style: { fontSize: "12px" } }}
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
      <TableRow key={row.key} className="hovered-row" onClick={() => { setSelectedRow(row); setDialogOpen(true); }}>
        {columns.map((col) => (
          <TableCell 
            key={col.key} 
            className={col.dataIndex === "rejDescription" ? "rej-description" : ""}
            >
            {row[col.dataIndex]}
          </TableCell>
        ))}
      </TableRow>
    ))
  )}
</TableBody>
        </Table>

        {/* Confirmation Dialog */}
        {dialogOpen && selectedRow && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              style: {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "10px",
                width: "300px", // Reduced dialog size
              },
            }}
          >
            {/* Dialog Header with Close Button */}
            <DialogTitle
              style={{
                backgroundColor: "#1976D2",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                position: "relative",
              }}
            >
              Confirm Action
              <IconButton
                onClick={() => setDialogOpen(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 24,
                  height: 24,
                  padding: 0,
                  color: "white",
                }}
              >
                <CloseIcon fontSize="small" />
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
              <Button onClick={() => setDialogOpen(false)} style={{ backgroundColor: "blue", color: "white" }}>
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