import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaShoppingCart,
  FaTimesCircle,
  FaDollarSign,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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

const Card = ({ book }) => {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setInCart(cartItems.some((item) => item.id === book.id));
  }, []);

  const handleCart = () => {
    let cartItems = manageCart(book);
    setInCart(cartItems.some((item) => item.id === book.id));
  };

  return (
    <div className="pt-4 flex-grow w-[22rem] h-[16.5rem] flex flex-row items-center space-x-4">
      <img
        src={book.image}
        alt={book.title}
        className="w-1/2 h-64 ml-4 object-cover shadow-2xl rounded"
      />
      <section className="w-1/2 h-9/10 flex flex-col text-xs mr-4 justify-around">
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
            {book.price}
          </span>
        </section>
        <button
          onClick={handleCart}
          className={`flex flex-row text-sm border rounded text-white hover:text-black border-b-4 ${
            inCart
              ? "bg-red-500 hover:bg-red-400 border-red-700"
              : "bg-green-500 hover:bg-green-400 border-green-700"
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
