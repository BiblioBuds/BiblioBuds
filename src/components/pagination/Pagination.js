import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md text-blue-500 hover:text-white hover:bg-red-500 duration-300"
      >
        Prev
      </button>
      {renderPaginationLinks()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md text-blue-500 hover:text-white hover:bg-red-500 duration-300"
      >
        Next
      </button>
    </div>
  );

  function renderPaginationLinks() {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === currentPage}
          className={`px-3 py-1 border rounded-md ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:text-white hover:bg-red-500 duration-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return links;
  }
};

export default Pagination;
