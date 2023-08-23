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
    <div>
      <Filters />
      {isLoading ? <p>Loading...</p> : <Cards books={books} />}
    </div>
  );
};

export default Shop;
