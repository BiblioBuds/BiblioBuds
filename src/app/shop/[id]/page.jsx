"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manageCart = (book, quantity) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let itemIndex = cartItems.findIndex((item) => item.id === book.id);

  if (itemIndex !== -1) {
    toast.info(
      `You have removed ${cartItems[itemIndex].title} from your cart.`
    );
    cartItems.splice(itemIndex, 1);
  } else {
    let bookWithQuantity = { ...book, quantity };
    cartItems.push(bookWithQuantity);
    toast.success("Item successfully added to your cart.");
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  return cartItems;
};

const Detail = ({ params }) => {
  // TODO: Mover todo a un componente detail y pasarle el libro por props.
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id } = params;
  const [book, setBook] = useState({});

  useEffect(() => {
    fetchBookById(id);
  }, [id]);

  const fetchBookById = async (id) => {
    await axios
      .get(`/api/books/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setBook(data);
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setInCart(cartItems.some((item) => item.id === data.id));
      });
  };

  // useEffect(() => {
  //   let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   setInCart(cartItems.some((item) => item.id === book.id));
  // }, []);

  const handleCart = () => {
    let cartItems = manageCart(book, quantity);
    setInCart(cartItems.some((item) => item.id === book.id));
  };

  return (
  
      <div className="self-center w-[80%] h-[75%] bg-gradient-to-b from-purple-200 to-purple-300 rounded-r-3xl">
      <div className="flex flex-row gap-24 justify-center">
        <div className="justify-center flex flex-col">
          <img
            style={{ display: "inline" }}
            className="ml-12 mt-8 transition duration-500 max-h-[400px] max-w-[270px] rounded-md"
            src={book.image}
            alt="imagen"
          />
          <div className="flex flex-row ml-24 mt-2" onClick={() => console.log(inCart)}>
            <StarIcon className="h-8 w-8 text-white" />
            <StarIcon className="h-8 w-8 text-white" />
            <StarIcon className="h-8 w-8 text-white" />
            <StarIcon className="h-8 w-8 text-white" />
            <StarIcon className="h-8 w-8 text-white" />
            </div>
        <div className="justify-center flex flex-col mr-12 mt-10">

          <h1 className="text-5xl mt-6 pt-0 mb-4 font-cursive mx-6 ml-0 text-white drop-shadow-lg">
            {book.title}
          </h1>
          <div className="grid grid-cols-2 gap-1">
            <h1 className="text-3xl pt-0 mb-4 font-cursive mx-6 ml-0 text-white indent-3 drop-shadow-lg">
              {book.author}
              </h1>
              <h1 className="text-3xl pt-0 mb-4 font-cursive mx-6 ml-0 text-white indent-3 drop-shadow-lg">
              ${(book.price * quantity).toFixed(2)}
            </h1>
          </div>
          <div className="overflow-auto h-48">
            <h1 className="text-xl pt-0 mb-2 font-cursive mx-6 ml-0 text-white italic drop-shadow-lg overflow-auto h-36">
              {book.synopsis}
            </h1>
          </div>
          {!inCart ? (
            <div className="flex mt-2 space-x-8 justify-center">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="border-b-[3px] border border-green-700 bg-green-500 text-white rounded py-2 px-4"
              >
                <FaMinus />
              </button>
              <input
                className="w-[6rem] text-center border border-b-[3px] border-green-700 bg-green-500 text-white font-cursive rounded"
                type="text"
                value={quantity}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === "") {
                    setQuantity(1);
                  } else {
                    value = parseInt(value);
                    if (value < 1) {
                      } else if (value > book.stock) {
                        setQuantity(book.stock);
                      } else {
                        setQuantity(value);
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (quantity < book.stock) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className="border-b-[3px] border border-green-700 bg-green-500 text-white rounded py-2 px-4"
                >
                  <FaPlus />
                </button>
              </div>
            ) : null}
            <button
              className={`p-4 mt-4 mb-4 text-white text-lg font-bold rounded border border-b-4 ${
                inCart
                  ? "bg-red-500 border-red-700 hover:border-red-500 hover:bg-red-700"
                  : "bg-green-500 border-green-700 hover:border-green-500 hover:bg-green-700"
              } hover:text-white duration-300`}
              onClick={handleCart}
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
