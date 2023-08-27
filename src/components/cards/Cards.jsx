import React from "react";
import Card from "./card";

const Cards = ({ books }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center w-full mx-auto">
      {books.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Cards;
