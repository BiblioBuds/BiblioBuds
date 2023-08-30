"use client";

import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useGlobalContext } from "@/app/Context/store";

const Pagination = () => {
  const { books, page, setPage, size } = useGlobalContext();

  const totalPages = Math.ceil(books?.length / size);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="flex justify-center space-x-2">
      {!(page === 1) && books?.books?.length > 0 ? (
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 border rounded border-b-4 border-b-black border-black text-black ${
            page === 1 ? "" : "hover:text-white hover:bg-black"
          } duration-300`}
        >
          <FaAngleLeft className="h-[75%]" />
        </button>
      ) : null}
      {renderPaginationLinks()}
      {!(page === totalPages) && books?.books?.length > 0 ? (
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded border-b-4 border-b-black border-black text-black ${
            page === totalPages ? "" : "hover:text-white hover:bg-black"
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
          onClick={() => handlePageChange(i)}
          disabled={i === page}
          className={`px-3 py-1 border rounded border-b-4 border-black border-b-black font-bold  ${
            i === page
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
