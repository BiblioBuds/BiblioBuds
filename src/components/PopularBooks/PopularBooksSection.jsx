
import React from "react";
import Card from "@/components/cards/card"; // Asegúrate de importar el componente Card

const PopularBooksSection = ({ books }) => {
  // Filtra los libros populares (puedes ajustar este criterio según tus necesidades)
  const popularBooks = books.slice(0, 4);

  return (
    <section>
      <h2>Libros Populares</h2>
      <div className="popular-books-container">
        {popularBooks.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default PopularBooksSection;











