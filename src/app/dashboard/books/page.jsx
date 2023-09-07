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
import { useGlobalContext } from "@/app/Context/store";
import { useSession } from "next-auth/react";

const Books = () => {
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (session) {
          let userId = session.user.id;
          axios
            .get("/api/users/admin?" + userId)
            .then((res) => res.data)
            .then((data) => setIsAdmin(data.role));
          // console.log(isAdmin)
        }
      }, [status, isAdmin]);


    const { booksAdminTable } = useGlobalContext();

    return (
        <div>
            {isAdmin === "ADMIN"?
            <div>
                <BooksTable books={booksAdminTable}/>
            </div>
            : 
            <div>
                <h1>Not Allowed</h1>
            </div>
            }       
        </div>
    )
}
export default Books;
