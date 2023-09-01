"use client";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ book, removeFromCart }) => (
  <div className="flex flex-row bg-zinc-100 rounded border border-b-[6px] border-black w-[90%] space-x-8 text-sm">
    <section>
      <img className="w-32 h-56 rounded-tl" src={book.image} alt={book.title} />
    </section>
    <section className="flex flex-col w-[81%] justify-evenly">
      <div className="font-lato">
        <span className="font-bold">Title: </span>
        {book.title}
      </div>
      <div className="font-lato">
        <span className="font-bold">Author: </span>
        <span className="italic">{book.author}</span>
      </div>
      <div className="font-lato">
        <span className="font-bold">Editorial: </span>
        {book.editorial?.editorial}
      </div>
      <div className="space-x-1 font-lato">
        <span className="font-bold">Languages:</span>
        {book.bookLanguages.map((item, index) => (
          <span
            onClick={() => console.log(item)}
            key={index}
            className="rounded p-1 bg-green-600 border-b-2 border-b-green-800 text-white font-bold"
          >
            {item?.language.language}
          </span>
        ))}
      </div>
      {/* <div className="space-x-1 font-lato">
        <span className="font-bold">Genres:</span>
        {book.bookGenres.map((item) => (
          <span
            onClick={() => console.log(item)}
            className="rounded p-1 bg-green-600 border-b-2 border-b-green-800 text-white font-bold"
          >
            {item?.genre.genre}
          </span>
        ))}
      </div>
      <div className="space-x-1 font-lato">
        <span className="font-bold">Formats:</span>
        {book.bookFormats.map((item) => (
          <span
            onClick={() => console.log(item)}
            className="rounded p-1 bg-green-600 border-b-2 border-b-green-800 text-white font-bold"
          >
            {item?.format.format}
          </span>
        ))}
      </div> */}
      <button
        className={`flex flex-row border rounded text-white hover:text-black border-b-4 bg-red-500 hover:bg-red-400 border-red-700 duration-300 font-bold mt-2 p-1 justify-center items-center`}
        onClick={() => removeFromCart(book)}
      >
        REMOVE FROM CART
      </button>
      {/* <div className="font-lato">
        <span className="font-bold">Price: </span>${book.price}
      </div> */}
    </section>
  </div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    setLoading(false);
  }, []);

  const removeFromCart = (book) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let itemIndex = cartItems.findIndex((item) => item.id === book.id);

    toast.info(
      `You have removed ${cartItems[itemIndex].title} from your cart.`
    );
    cartItems.splice(itemIndex, 1);

    localStorage.setItem("cart", JSON.stringify(cartItems));

    setCartItems(cartItems);
    return cartItems;
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    if (cartItems.length > 0) {
      toast.warn("Your cart was cleared successfully.");
    }
    setCartItems([]);
  };

  const checkout = () => {
    localStorage.removeItem("cart");
    if (cartItems.length > 0) {
      toast.success(
        "Order confirmed! We have received your payment and will proceed to fulfill your order. Thank you for shopping with us!"
      );
    }
    setCartItems([]);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-4">
      <h1 className="p-2 text-xl font-bold font-inter tracking-wide">
        BIBLIOBUDS CART!{" "}
        {cartItems.length ? `(${cartItems.length} ITEMS)` : null}
      </h1>
      <div className="flex flex-row w-full">
        <div className="flex-grow w-2/3 flex flex-col justify-center items-center space-y-4">
          {!isLoading &&
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                book={item}
                removeFromCart={removeFromCart}
              />
            ))}
        </div>
        <div className="space-x-8 w-1/3 flex flex-col items-start">
          <div className="p-2 rounded bg-zinc-200 w-[90%] h-fit space-y-3">
            <h1 className="font-bold font-inter text-xl">ORDER SUMMARY</h1>
            <div className="border border-black"></div>
            {cartItems.map((item, index) => (
              <div className="flex justify-between" key={index}>
                <div className="text-sm">
                  <span className="font-bold">x{item.quantity}</span>{" "}
                  {item.title}
                </div>
                <div className="text-sm font-bold">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
            <p className="font-bold font-inter">
              TOTAL COST: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <div className="border border-black"></div>
            <div className="space-x-4 flex justify-evenly">
              <button
                className="p-1 w-full bg-green-500 text-white font-bold rounded border border-green-700 border-b-4 hover:bg-green-700 hover:border-green-500 duration-300"
                onClick={() => checkout()}
              >
                CHECKOUT
              </button>
              <button
                className="p-1 w-full bg-red-500 text-white font-bold rounded border border-red-700 border-b-4 hover:bg-red-700 hover:border-red-500 duration-300"
                onClick={clearCart}
              >
                CLEAR CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
