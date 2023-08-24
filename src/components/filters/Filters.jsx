"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";

const FilterCategory = ({ title, items, setFilters }) => (
  <div className="my-2">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item) => (
      <p
        onClick={() => {
          setFilters(item.name);
        }}
        key={item.id}
        className="text-xs py-1 cursor-pointer hover:underline hover:text-red-500"
      >
        {item.name}
      </p>
    ))}
  </div>
);

const OrderCategory = ({ title, items, setFilters }) => (
  <div className="my-2">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item, index) => (
      <p
        onClick={() => {
          setFilters(`${item.toLowerCase()}: desc`);
        }}
        key={index}
        className="text-xs py-1 cursor-pointer hover:underline hover:text-red-500"
      >
        {item}
      </p>
    ))}
  </div>
);

const FilterTag = ({ filter, setFilters, filterValue }) => (
  <p
    className="w-fit cursor-pointer text-sm border-2 border-black hover:bg-black hover:text-white rounded-xl p-1 duration-300"
    onClick={() => setFilters("")}
  >
    {filterValue} X
  </p>
);

const Filters = () => {
  const [isLoading, setLoading] = useState(true);

  const {
    books,
    setBooks,
    filteredBooks,
    setFilteredBooks,
    genres,
    setGenres,
    editorials,
    setEditorials,
    formats,
    setFormats,
    languages,
    setLanguages,
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

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setGenres(data);
      });
    axios
      .get("/api/formats")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setFormats(data);
      });
    axios
      .get("/api/languages")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLanguages(data);
      });
    axios
      .get("/api/editorials")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setEditorials(data);
      });
    // return () => {
    setLoading(false);
    // };
  }, []);

  const filterBooks = () => {
    const queryString = new URLSearchParams({
      filterGenre,
      filterFormat,
      filterLanguage,
      filterEditorial,
      orderBooks,
    }).toString();
    console.log(queryString);
    axios
      .get("/api/books/filters?" + queryString)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setBooks(data);
      });
  };

  useEffect(() => {
    filterBooks();
  }, [filterGenre, filterFormat, filterLanguage, filterEditorial, orderBooks]);

  return (
    <div className="p-2">
      <h1
        onClick={() =>
          console.log({
            filterEditorial,
            filterFormat,
            filterGenre,
            filterLanguage,
            orderBooks,
          })
        }
        className="font-bold text-xl"
      >
        Categories
      </h1>
      <div className="flex flex-wrap">
        {filterGenre ? (
          <FilterTag
            key={filterGenre}
            filter="genre"
            setFilters={setFilterGenre}
            filterValue={filterGenre}
          />
        ) : null}
        {filterFormat ? (
          <FilterTag
            key={filterFormat}
            filter="format"
            setFilters={setFilterFormat}
            filterValue={filterFormat}
          />
        ) : null}
        {filterLanguage ? (
          <FilterTag
            key={filterLanguage}
            filter="language"
            setFilters={setFilterLanguage}
            filterValue={filterLanguage}
          />
        ) : null}
        {filterEditorial ? (
          <FilterTag
            key={filterEditorial}
            filter="editorial"
            setFilters={setFilterEditorial}
            filterValue={filterEditorial}
          />
        ) : null}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FilterCategory
            title="Genre"
            setFilters={setFilterGenre}
            items={genres.map(({ id, genre }) => ({ id, name: genre }))}
          />
          <FilterCategory
            title="Format"
            setFilters={setFilterFormat}
            items={formats.map(({ id, format }) => ({ id, name: format }))}
          />
          <FilterCategory
            title="Language"
            setFilters={setFilterLanguage}
            items={languages.map(({ id, language }) => ({
              id,
              name: language,
            }))}
          />
          <FilterCategory
            title="Editorial"
            setFilters={setFilterEditorial}
            items={editorials.map(({ id, editorial }) => ({
              id,
              name: editorial,
            }))}
          />
        </>
      )}
      <OrderCategory
        title="Order"
        setFilters={setOrderBooks}
        items={["Title", "Price", "Pages"]}
      />
    </div>
  );
};

export default Filters;
