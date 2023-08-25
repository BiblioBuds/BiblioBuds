"use client";

import Cards from "@/components/cards/Cards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/cards/card";
import Filters from "@/components/filters/Filters";
import { useGlobalContext } from "../Context/store";
import Pagination from "@/components/pagination/Pagination";
//id, title, author, image, price, pages
const Shop = () => {
  // const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const {
    books,
    setBooks,
    filteredBooks,
    setFilteredBooks,
    filterGenre,
    setFilterGenre,
    filterEditorial,
    setFilterEditorial,
    filterFormat,
    setFilterFormat,
    filterLanguage,
    setFilterLanguage,
    orderBooks,
    setOrderBooks,
    page,
    setPage,
    size,
    setSize,
  } = useGlobalContext();

  const handlePageChange = (page) => {
    setPage(page);
  };

  // TODO: Mover esto al componente cards?
  useEffect(() => {
    const queryString = new URLSearchParams({
      filterGenre,
      filterFormat,
      filterLanguage,
      filterEditorial,
      orderBooks,
      page,
      size,
    }).toString();
    axios
      .get("/api/books/filters?" + queryString)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setBooks(data);
        setLoading(false);
      });
  }, [page]);
  return (
    <div className="flex">
      <div className=" w-[15%] p-4">
        <Filters setBooks={setBooks} />
      </div>
      <div className="p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className=" space-y-5 w-full">
            <Cards books={books.books} />
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(books.length / size)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
