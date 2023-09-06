"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { data: session, status } = useSession();

  const fetchOrders = async () => {
    if (status === "authenticated") {
      try {
        const response = await axios.get(`/api/orders/${session.user.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const cancelOrder = (orderId) => {
    axios
      .put(`/api/orders/${orderId}`, { userId: session.user.id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("The order was successfully canceled.");
        } else {
          toast.error(
            "There was an error trying to cancel the order. Please try again later."
          );
        }
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "There was an error trying to cancel the order. Please try again later."
        );
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 font-inter">My Orders</h1>
      {orders.length === 0 ? (
        <p>You don't have any orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders
            .sort((a, b) => b.id - a.id)
            .map((order) => (
              <li
                key={order.id}
                className="bg-white shadow-md rounded-lg border border-black p-4 font-raleway"
              >
                <p className="text-lg font-semibold">
                  Order Number: {order.id}
                </p>
                <p
                  className={`${
                    order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className="text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString("en-CA")}
                </p>
                <p className="mt-2 text-lg">Products:</p>
                <ul className="list-disc ml-4 font-inter">
                  {order.details.map((product) => (
                    <li key={product.id}>
                      {product.book.title} - Amount: {product.quantity}
                    </li>
                  ))}
                </ul>
                {order.status === "Pending" ? (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="p-2 mt-2 rounded border border-black text-white bg-red-500 hover:bg-red-700 duration-300"
                  >
                    Cancel Order
                  </button>
                ) : null}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
