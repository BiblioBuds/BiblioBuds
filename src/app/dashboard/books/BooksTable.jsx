"use client"

import axios from "axios";
import { useState } from "react";
import ProductsCard from "./ProductsCard";

const BooksTable = ({books}) => {

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
                <th className="py-3 px-6 border-b">Stock</th>
                <th className="py-3 px-6 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books?.sort((a, b) => a.id - b.id)?.map((item) => (
                <ProductsCard key={item.id} item={item}/>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default BooksTable;