"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const FilterCategory = ({ title, items, setFilters }) => (
  <div className="my-2">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item) => (
      <p
        onClick={() => {
          setFilters((prevState) => ({
            ...prevState,
            [title.toLowerCase()]: item.name,
          }));
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
          setFilters((prevState) => {
            const currentOrder = prevState.orderBy[item.toLowerCase()];
            const newOrder = currentOrder === "desc" ? "asc" : "desc";
            return {
              ...prevState,
              orderBy: {
                [item.toLowerCase()]: newOrder,
              },
            };
          });
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
    onClick={() =>
      setFilters((prevState) => ({
        ...prevState,
        [filter]: "",
      }))
    }
  >
    {filterValue} X
  </p>
);

const Filters = ({ setBooks }) => {
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    editorial: "",
    format: "",
    language: "",
    genre: "",
    orderBy: {
      title: "desc",
    },
  });

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
    axios
      .post("/api/books/filters", filters)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setBooks(data);
      });
  };

  useEffect(() => {
    filterBooks();
  }, [filters]);

  return (
    <div className="p-2">
      <h1 onClick={() => console.log(filters)} className="font-bold text-xl">
        Categories
      </h1>
      <div className="flex flex-wrap">
        {filters.genre ? (
          <FilterTag
            key={filters.genre}
            filter="genre"
            setFilters={setFilters}
            filterValue={filters.genre}
          />
        ) : null}
        {filters.format ? (
          <FilterTag
            key={filters.format}
            filter="format"
            setFilters={setFilters}
            filterValue={filters.format}
          />
        ) : null}
        {filters.language ? (
          <FilterTag
            key={filters.language}
            filter="language"
            setFilters={setFilters}
            filterValue={filters.language}
          />
        ) : null}
        {filters.editorial ? (
          <FilterTag
            key={filters.editorial}
            filter="editorial"
            setFilters={setFilters}
            filterValue={filters.editorial}
          />
        ) : null}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FilterCategory
            title="Genre"
            setFilters={setFilters}
            items={genres.map(({ id, genre }) => ({ id, name: genre }))}
          />
          <FilterCategory
            title="Format"
            setFilters={setFilters}
            items={formats.map(({ id, format }) => ({ id, name: format }))}
          />
          <FilterCategory
            title="Language"
            setFilters={setFilters}
            items={languages.map(({ id, language }) => ({
              id,
              name: language,
            }))}
          />
          <FilterCategory
            title="Editorial"
            setFilters={setFilters}
            items={editorials.map(({ id, editorial }) => ({
              id,
              name: editorial,
            }))}
          />
        </>
      )}
      <OrderCategory
        title="Order"
        setFilters={setFilters}
        items={["Title", "Price", "Pages"]}
      />
    </div>
  );
};

export default Filters;
