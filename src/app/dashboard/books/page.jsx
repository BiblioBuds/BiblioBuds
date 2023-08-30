// import BooksTable from "./BooksTable"

// const fetchBooks = () => {
//     return fetch("https://biblio-buds-git-dev-bibliobuds.vercel.app/api/books", {cache: "no-store"})
//     .then(res=> res.json())
// };

// const Books = async () => {

//     const books = await fetchBooks()

//     return (
//         <div>
//             <BooksTable books={books}/>
//         </div>
//     )
// };
// export default Books;

"use client"
import { useEffect, useState } from "react";
import axios from "axios"
import BooksTable from "./BooksTable"

const Books = () => {

    const [books, setBooks] = useState()

    useEffect(() => {
        axios
          .get("/api/books")
          .then((res) => res.data)
          .then((data) => setBooks(data))
    })

    return (
        <div>
            <BooksTable books={books}/>
        </div>
    )
}
export default Books;
