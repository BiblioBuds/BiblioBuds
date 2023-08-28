"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manageCart = (book) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let itemIndex = cartItems.findIndex((item) => item.id === book.id);

  if (itemIndex !== -1) {
    toast.info(
      `You have removed ${cartItems[itemIndex].title} from your cart.`
    );
    cartItems.splice(itemIndex, 1);
  } else {
    cartItems.push(book);
    toast.success("Item successfully added to your cart.");
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  return cartItems;
};

const Detail = ({ params }) => {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setInCart(cartItems.some((item) => item.id === book.id));
  }, []);

  const handleCart = () => {
    let cartItems = manageCart(book);
    setInCart(cartItems.some((item) => item.id === book.id));
  };

  const { id } = params;
  const [book, setBook] = useState({});
  useEffect(() => {
    fetchBookById(id);
  }, [id]);

  const fetchBookById = async (id) => {
    const data = await axios.get(`/api/books/${id}`).then((res) => res.data);
    setBook(data);
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="self-center w-[80%] h-[75%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-r-3xl">
        <div className="mx-4 mt-3 h-20 grid grid-cols-2 gap-1 justify-center">
          <div className="justify-center flex flex-col">
            <img
              style={{ display: "inline" }}
              className="ml-12 mt-8 transition duration-500 max-h-[400px] max-w-[270px] rounded-md"
              src={book.image}
              alt="imagen"
            />
          </div>
          <div className="justify-center flex flex-col mr-6">
            <div className="flex flex-row">
              <StarIcon className="h-6 w-6 text-white" />
              <StarIcon className="h-6 w-6 text-white" />
              <StarIcon className="h-6 w-6 text-white" />
              <StarIcon className="h-6 w-6 text-white" />
              <StarIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className=" text-4xl mt-2 pt-0 mb-4 font-serif mx-6 ml-0 text-white drop-shadow-lg">
              {book.title}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <h1 className=" text-2xl pt-0 mb-4 font-serif mx-6 ml-0 text-white indent-3 drop-shadow-lg">
                {book.author}
              </h1>
              <h1 className=" text-2xl pt-0 mb-4 font-serif mx-6 ml-0 text-white indent-3 drop-shadow-lg">
                ${book.price}
              </h1>
            </div>
            <div className="overflow-auto h-48">
              <h1 className=" text-lg pt-0 mb-4 font-serif mx-6 ml-0 text-white italic drop-shadow-lg overflow-auto">
                {book.synopsis}
              </h1>
            </div>
            <button
              className={`p-4 mt-8 text-lg font-bold rounded border-2 border-b-4 ${
                inCart
                  ? "bg-red-500 border-red-700 hover:border-red-500 hover:bg-red-700"
                  : "bg-green-500 border-green-700 hover:border-green-500 hover:bg-green-700"
              } hover:text-white duration-300`}
              onClick={() => handleCart(book)}
            >
              {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
