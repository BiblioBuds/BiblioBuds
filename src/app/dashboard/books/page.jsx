import BooksTable from "./BooksTable"

const fetchBooks = () => {
    return fetch("https://biblio-buds-git-dev-bibliobuds.vercel.app/api/books", {cache: "no-store"})
    .then(res=> res.json())
};

const Books = async () => {

    const books = await fetchBooks()

    return (
        <div>
            <BooksTable books={books}/>
        </div>
    )
};
export default Books;

// "use client"
// import { useEffect } from "react";
// import axios from "axios"

// const Books = () => {

//     useEffect(() => {
//         axios
//           .get("/api/books")
//           .then((res) => res.data)
//           .then((data) => console.log(data))
//         })

//     return (
//         <div>
//             <p>hola</p>
//         </div>
//     )
// }
// export default Books;
