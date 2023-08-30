"use client";

import React from "react";
import { useGlobalContext } from "@/app/Context/store";

const FilterCategory = ({ title, items, setFilters }) => (
  <div className="my-1">
    <h2 className="font-bold text-lg">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item) => (
      <p
        onClick={() => {
          setFilters(item.name);
        }}
        key={item.id}
        className="text-xs py-[0.1rem] cursor-pointer font-raleway hover:underline hover:text-red-500"
      >
        {item.name}
      </p>
    ))}
  </div>
);

const OrderCategory = ({ title, items, setFilters }) => (
  <div className="my-1">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item, index) => (
      <p
        onClick={() => {
          setFilters(`${item.toLowerCase()}`);
        }}
        key={index}
        className="text-xs py-[0.1rem] cursor-pointer font-raleway hover:underline hover:text-red-500"
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
  const {
    genres,
    editorials,
    formats,
    languages,
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
  } = useGlobalContext();

  return (
    <div className="p-2 w-fit">
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
      <OrderCategory
        title="Order"
        setFilters={setOrderBooks}
        items={["Title", "Price", "Pages"]}
      />
    </div>
  );
};

export default Filters;
