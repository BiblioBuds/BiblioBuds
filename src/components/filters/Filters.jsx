"use client";

import React from "react";
import { useGlobalContext } from "@/app/Context/store";

const ORDER_ITEMS = ["Title", "Price", "Pages"];

const Category = ({ title, items, setFilters, mapItem }) => (
  <div className="my-1">
    <h2 className="font-bold text-lg">{title}</h2>
    <div className="border-t border-gray-200"></div>
    {items.map((item) => mapItem(setFilters, item))}
  </div>
);

const FilterTag = ({ filter, setFilters, filterValue }) => {
  const handleClick = () => setFilters("");
  return (
    <p
      className="w-fit cursor-pointer text-sm border-2 border-black hover:bg-black hover:text-white rounded-xl p-1 duration-300"
      onClick={handleClick}
    >
      {filterValue} X
    </p>
  );
};

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

  const mapFilterItem = (setFilters, item) => (
    <p
      onClick={() => setFilters(item.name)}
      key={item.id}
      className="text-xs py-[0.1rem] cursor-pointer font-raleway hover:underline hover:text-red-500"
    >
      {item.name}
    </p>
  );

  const mapOrderItem = (setFilters, item) => (
    <p
      onClick={() => setFilters(item.toLowerCase())}
      key={item}
      className="text-xs py-[0.1rem] cursor-pointer font-raleway hover:underline hover:text-red-500"
    >
      {item}
    </p>
  );

  return (
    <div className="p-2 w-fit">
      <h1 className="font-bold text-xl">Categories</h1>
      <div className="flex flex-wrap">
        {filterGenre && (
          <FilterTag
            key={filterGenre}
            filter="genre"
            setFilters={setFilterGenre}
            filterValue={filterGenre}
          />
        )}
        {filterFormat && (
          <FilterTag
            key={filterFormat}
            filter="format"
            setFilters={setFilterFormat}
            filterValue={filterFormat}
          />
        )}
        {filterLanguage && (
          <FilterTag
            key={filterLanguage}
            filter="language"
            setFilters={setFilterLanguage}
            filterValue={filterLanguage}
          />
        )}
        {filterEditorial && (
          <FilterTag
            key={filterEditorial}
            filter="editorial"
            setFilters={setFilterEditorial}
            filterValue={filterEditorial}
          />
        )}
      </div>
      <Category
        title="Genre"
        setFilters={setFilterGenre}
        items={genres.map(({ id, genre }) => ({ id, name: genre }))}
        mapItem={mapFilterItem}
      />
      <Category
        title="Format"
        setFilters={setFilterFormat}
        items={formats.map(({ id, format }) => ({ id, name: format }))}
        mapItem={mapFilterItem}
      />
      <Category
        title="Language"
        setFilters={setFilterLanguage}
        items={languages.map(({ id, language }) => ({ id, name: language }))}
        mapItem={mapFilterItem}
      />
      <Category
        title="Editorial"
        setFilters={setFilterEditorial}
        items={editorials.map(({ id, editorial }) => ({ id, name: editorial }))}
        mapItem={mapFilterItem}
      />
      <Category
        title="Order"
        setFilters={setOrderBooks}
        items={ORDER_ITEMS}
        mapItem={mapOrderItem}
      />
    </div>
  );
};

export default Filters;
