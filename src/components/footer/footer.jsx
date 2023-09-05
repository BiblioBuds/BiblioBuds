"use client";

import style from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(formData.email)) {
      errors.push("Email must be valid.");
    }
    if (formData.message.length < 25) {
      errors.push("Message must contain at least 25 characters.");
    }
    if (errors.length === 0) {
      axios
        .post("/api/contact", {
          email: formData.email,
          phone: formData.phone,
          text: formData.message,
        })
        .then(() => {
          toast.success(
            `Your message was sent successfully. We will contact you through email. Enjoy shopping!.`
          );
        })
        .catch((err) => console.log(err));
    } else {
      toast.error(
        `Your message didn't go through because of the following reasons: ${errors.join(
          " "
        )}`
      );
    }
  };

  // TODO: Validar los campos y crear el endpoint
  return (
    <div className="flex flex-grow w-full justify-center bg-[#87C6E9] text-white p-6 mt-8">
      <div className="flex flex-col md:flex-row w-full xl:w-3/4 2xl:w-1/2 space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full xl:w-3/4 px-10"
        >
          <p className="text-lg font-bold mb-2">CONTACT US</p>
          <p className="text-sm mb-4">
            We're here to assist you with any questions or concerns you may
            have. Whether you need help finding the perfect book, have inquiries
            about your order, or just want to share your feedback, our team is
            ready to assist you.
          </p>
          <div className="flex mb-4 space-x-2 xl:space-x-4 2xl:space-x-8">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              value={formData.phone}
              className="w-full px-3 py-2 border rounded text-sm text-gray-500"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 border rounded text-sm text-gray-500"
            />
          </div>
          <textarea
            placeholder="Message..."
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-sm mb-4 text-gray-500"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 duration-300 text-white rounded"
          >
            Submit
          </button>
        </form>
        <section className="flex flex-col w-full xl:w-1/2 2xl:w-1/4 space-y-4 pl-10 text-white">
          <p className="text-lg font-bold mb-2">CONTACT INFORMATION</p>
          <div className="mb-4">
            <p className="text-sm">77 Fake Street</p>
            <p className="text-sm">Buenos Aires. 5001</p>
            <p className="text-sm">Argentina</p>
          </div>
          <div>
            <p className="text-sm">Call Us!</p>
            <p className="text-sm">+54 351 7074422</p>
          </div>
          <div>
            <p className="text-sm">Email Us!</p>
            <p className="text-sm">Bibliobuds@gmail.com</p>
          </div>
          <p className="text-lg font-bold">FOLLOW US</p>
          <div className="space-x-2">
            <Link href="https://www.instagram.com" className="text-sm">
              Instagram
            </Link>
            <Link href="https://www.twitter.com" className="text-sm">
              Twitter
            </Link>
            <Link href="https://www.facebook.com" className="text-sm">
              Facebook
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Footer;
