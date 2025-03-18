import React from "react";
import "./Pagination.css"; // Ensure you have styles

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination-container">
      {/* First Button (Fixed size issue) */}
      <button
        className="pagination-button first"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {/* Previous Button */}
      <button
        className="pagination-button-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {/* Page Numbers */}
      {displayedPages.map((pg) => (
        <button
          key={pg}
          className={`pagination-button ${currentPage === pg ? " active" : ""}`}
          onClick={() => onPageChange(pg)}
        >
          {pg}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="pagination-button-next==="
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>

      {/* Last Button (Fixed size issue) */}
      <button
        className="pagination-button last"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
       »
      </button>
    </div>
  );
};

export default Pagination;