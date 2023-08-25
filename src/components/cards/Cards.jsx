import React from "react";
import Card from "./card";

//id, title, author, image, price, pages
const Cards = ({ books }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
      {books.map((book) => (
        <Card
          key={book.id}
          book={book}
          // id={book.id}
          // title={book.title}
          // author={book.author}
          // image={book.image}
          // price={book.price}
          // pages={book.pages}
        />
      ))}
    </div>
  );
};

export default Cards;
