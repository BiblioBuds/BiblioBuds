"use client";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ book, removeFromCart }) => (
  <div className="flex w-full items-center justify-between p-4 bg-white shadow border border-black rounded-lg">
    <img
      src={book?.image}
      alt={book?.title}
      className="w-16 h-24 mr-4 object-cover rounded"
    />
    <div className="flex-1">
      <h2 className="text-lg font-semibold text-gray-900 font-inter">
        {book?.title}
      </h2>
      <p className="text-sm text-gray-600">By {book?.author}</p>
      <p className="text-sm text-gray-600">{book?.editorial?.editorial}</p>
      <p className="text-sm text-gray-600">{book?.language}</p>
      <p className="text-md font-semibold text-gray-900">${book?.price}</p>
    </div>
    <button
      className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 border border-black"
      onClick={() => removeFromCart(book)}
    >
      <FaXmark />
    </button>
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
    <div className="flex flex-col w-full justify-center items-center space-y-0 lg:space-y-2 xl:space-y-3 2xl:space-y-4">
      <h1 className="p-2 text-xl font-bold font-inter tracking-wide">
        BIBLIOBUDS CART!{" "}
        {cartItems.length ? `(${cartItems.length} ITEMS)` : null}
      </h1>
      <div className="flex flex-row w-full">
        <div className="flex-grow w-2/3 mx-12 flex flex-col justify-center items-center space-y-2 xl:space-y-3 2xl:space-y-4">
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
          <div className="p-2 rounded-lg bg-white border border-black shadow-lg w-[90%] h-fit space-y-3">
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
