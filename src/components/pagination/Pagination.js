import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center space-x-2">
      {!(currentPage === 1) ? (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded border-b-4 border-b-black border-black text-black ${
            currentPage === 1 ? "" : "hover:text-white hover:bg-black"
          } duration-300`}
        >
          <FaAngleLeft className="h-[75%]" />
        </button>
      ) : null}
      {renderPaginationLinks()}
      {!(currentPage === totalPages) ? (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded border-b-4 border-b-black border-black text-black ${
            currentPage === totalPages ? "" : "hover:text-white hover:bg-black"
          } duration-300`}
        >
          <FaAngleRight className="h-[75%]" />
        </button>
      ) : null}
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
          className={`px-3 py-1 border rounded border-b-4 border-black border-b-black font-bold  ${
            i === currentPage
              ? "bg-black text-white"
              : "text-black hover:text-white hover:bg-black duration-300"
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
