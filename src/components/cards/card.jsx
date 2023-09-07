"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBookOpen,
  FaShoppingCart,
  FaDollarSign,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import { toast } from "react-toastify";
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

const Card = ({ book }) => {
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   setInCart(cartItems.some((item) => item.id === book.id));
  // }, []);

  const handleCart = () => {
    let cartItems = manageCart(book, quantity);
    setInCart(cartItems.some((item) => item.id === book.id));
  };

  const router = useRouter();

  return (
    <div className="pt-4 flex-grow w-[22rem] h-[16.5rem] flex flex-row items-center space-x-4">
      <img
        src={book.image}
        alt={book.title}
        className="w-1/2 h-64 ml-4 object-cover shadow-2xl rounded cursor-pointer"
        onClick={() => router.push(`/shop/${book.id}`)}
      />
      <section className="w-1/2 h-9/10 flex flex-col text-xs mr-4 justify-around cursor-pointer">
        <div onClick={() => router.push(`/shop/${book.id}`)}>
          <span className="w-9/10 h-8 flex flex-row text-sm items-center font-semibold">
            {book.title}
          </span>
          <span className="w-9/10 h-8 flex flex-row text-sm items-center text-gray-600 italic">
            {book.author}
          </span>
          <section className="w-9/10 flex flex-row text-xs mt-2 space-x-4">
            <span className="flex flex-row text-sm justify-center items-center">
              <FaBookOpen className="mr-1" /> {book.pages}
            </span>
            <span className="flex flex-row text-sm justify-center items-center">
              <FaDollarSign />
              {(book.price * quantity).toFixed(2)}
            </span>
          </section>
        </div>
        {!inCart ? (
          <div className="flex mt-2 space-x-1">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              className="border-b-[3px] border border-indigo-400 bg-indigo-500 text-white rounded py-1 px-2"
            >
              <FaMinus />
            </button>
            <input
              className="w-[3rem] text-center border border-b-[3px] border-indigo-400 bg-indigo-500 text-white font-bold rounded"
              type="text"
              value={quantity}
              onChange={(e) => {
                let value = e.target.value;
                if (value === "") {
                  setQuantity(1);
                } else {
                  value = parseInt(value);
                  if (value < 1) {
                    setQuantity(1);
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
              className="border-b-[3px] border border-indigo-400 bg-indigo-500 text-white rounded py-1 px-2"
            >
              <FaPlus />
            </button>
          </div>
        ) : null}
        <button
          onClick={handleCart}
          className={`flex flex-row text-sm border rounded text-white hover:text-black border-b-4 ${
            inCart
              ? "bg-red-500 hover:bg-red-400 border-red-700"
              : "bg-indigo-400 hover:bg-indigo-400 border-indigo-400"
          } w-[75%] duration-300 font-bold mt-2 p-1 justify-center items-center`}
        >
          {inCart ? (
            <>REMOVE FROM CART</>
          ) : (
            <>
              <FaShoppingCart className="h-5 w-5" />
              ADD TO CART
            </>
          )}
        </button>
      </section>
    </div>
  );
};
export default Card;
