"use client";

import React from "react";
import Card from "./card";
import { useGlobalContext } from "@/app/Context/store";

const Cards = () => {
  const { books } = useGlobalContext();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center w-full mx-auto">
      {books?.length > 0 ? (
        books?.books?.map((book) => <Card key={book.id} book={book} />)
      ) : (
        <p className="font-raleway text-lg font-bold text-center">
          There are no books that match those filters.
        </p>
      )}
    </div>
  );
};

export default Cards;
