"use client"

import axios from "axios";
import { useState } from "react";

const BooksTable = ({books}) => {

    const handleDeactivate = async (id) => {
        try {
          await axios.put(`/api/books/${id}`, {
              isActive: "false"
            }
          );
          location.reload()
        } catch (error) {
          console.log(error);
        }
    };

    const handleActivate = async (id) => {
        try {
          await axios.put(`/api/books/${id}`, {
              isActive: "true"
            }
          );
          location.reload()
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div className="overflow-x-auto w-screen min-h-screen">
        <h1 className="text-center font-bold text-wine text-2xl m-2">
          All Books
        </h1>
        <div className="container mx-auto p-4">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="text-xs text-black uppercase bg-dark-wine">
              <tr>
                <th className="py-3 px-6 border-b">Id</th>
                <th className="py-3 px-6 border-b">Title</th>
                <th className="py-3 px-6 border-b">Author</th>
                <th className="py-3 px-6 border-b">Price</th>
                <th className="py-3 px-6 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books
                ?.sort((a, b) => a.id - b.id)
                .map((book, key) => {
                  return (
                    <tr
                      key={key}
                    >
                      <td className="py-3 px-2 text-center">{book.id}</td>
                      <td className="py-3 px-2 text-center">{book.title}</td>
                      <td className="py-3 px-2 text-center">{book.author}</td>
                      <td className="py-3 px-2 text-center">${book.price}</td>
                      <td className="py-3 px-2 text-center">
                        {book.isActive === "true" ? (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => handleDeactivate(book.id)}
                            >
                              Deactivate
                            </button>
                          </div>
                        ) : (
                          <div className="flex mx-auto justify-center my-1">
                            <button
                              className="text-sm border rounded text-white hover:text-black border-b-4 bg-green-500 hover:bg-green-400 border-green-700 w-fit duration-300 font-bold mt-2 p-1 justify-center items-center"
                              onClick={() => handleActivate(book.id)}
                            >
                              Activate
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default BooksTable;