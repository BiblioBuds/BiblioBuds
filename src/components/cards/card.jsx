import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBookOpen, FaShoppingCart, FaTimesCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// import style from "./card.module.css";
// Helper function to manage cart items
const manageCart = (book) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let itemIndex = cartItems.findIndex((item) => item.id === book.id);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
  } else {
    cartItems.push(book);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  return cartItems;
};

// const Card = ({ id, title, author, image, price, pages }) => {
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
    <div className="pt-4 w-80 h-60 flex flex-row items-center space-x-4">
      <img
        src={book.image}
        alt={book.title}
        className="w-1/2 h-56 ml-4 object-cover shadow-2xl rounded"
      />
      <section className="w-1/2 h-9/10 flex flex-col text-xs mr-4 justify-around">
        <span className="w-9/10 h-8 flex flex-row items-center font-semibold">
          {book.title}
        </span>
        <span className="w-9/10 h-8 flex flex-row items-center text-gray-600 italic">
          {book.author}
        </span>
        <section className="w-9/10 flex flex-row text-xs mt-2 space-x-4">
          <span className="flex flex-row justify-center items-center">
            <FaBookOpen className="mr-2" /> {book.pages}
          </span>
          <span className="">${book.price}</span>
        </section>
        <button
          onClick={handleCart}
          className={`flex flex-row border rounded text-white hover:text-black border-b-4 ${
            inCart
              ? "bg-red-500 hover:bg-red-400 border-red-700"
              : "bg-green-500 hover:bg-green-400 border-green-700"
          } w-[75%] duration-300 font-bold mt-2 p-1 justify-center items-center`}
        >
          {inCart ? (
            <>REMOVE FROM CART</>
          ) : (
            <>
              <FaShoppingCart />
              ADD TO CART
            </>
          )}
        </button>
      </section>
    </div>
  );
};
export default Card;
