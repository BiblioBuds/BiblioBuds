"use client";

import Cards from "@/components/cards/Cards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/cards/card";
import Filters from "@/components/filters/Filters";
//id, title, author, image, price, pages
const Shop = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setBooks(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="flex">
      <div className=" w-[15%] p-4">
        <Filters setBooks={setBooks} />
      </div>
      <div className="p-4">
        {isLoading ? <p>Loading...</p> : <Cards books={books} />}
      </div>
    </div>
  );
};

export default Shop;
