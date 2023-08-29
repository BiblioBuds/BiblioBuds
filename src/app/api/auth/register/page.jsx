"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    let validationErrors = { email: "", password: "" };
    if (!emailRegex.test(userData.email)) {
      validationErrors = {
        ...validationErrors,
        email: "The email must be valid.",
      };
    } else {
      validationErrors = {
        ...validationErrors,
        email: "",
      };
    }

    if (userData.password.length < 8) {
      validationErrors = {
        ...validationErrors,
        password: "The password must be at least 8 characters long.",
      };
    } else {
      validationErrors = {
        ...validationErrors,
        password: "",
      };
    }
    setErrors(validationErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    validate();
  }, [userData.email, userData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error(
            `Oops! There was an error creating your account. Please try again.`
          );
          throw new Error("Error creating account");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        toast.success(
          `Sign-up successful! A welcome email has been sent to your inbox.`
        );
        router.push("/api/auth/signin");
      })
      .catch((err) => {
        toast.error(`Oops! ${err.message}`);
        console.log(err);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center text-center bg-[#F3F3F3]">
      <div className="min-w-[30rem] max-w-[30rem] min-h-[60%] max-h-[60%] border-4 border-[#C0C0C0] rounded-lg bg-white h-full flex justify-center items-center">
        <div className="w-[90%] h-full flex flex-col justify-evenly">
          <h3 className="font-lato text-2xl lg:text-3xl">Sign Up</h3>
          <div className="flex flex-col space-y-1">
            <span className="font-lato md:text-lg lg:text-xl">Your Email</span>
            <input
              className="border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="Your Email"
            />
            {errors.email ? <p>{errors.email}</p> : null}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-lato md:text-lg lg:text-xl">
              Your Password
            </span>
            <input
              className="border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Your Password"
            />
            {errors.password ? <p>{errors.password}</p> : null}
          </div>
          <div
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 duration-300 p-3 rounded-xl text-white shadow-md space-x-1"
            onClick={handleSubmit}
          >
            <FaLock />
            <button>Create Account</button>
          </div>
          <Link href="/api/auth/signin">
            <p className="font-lato md:font-lg lg:font-xl hover:text-red-500 hover:underline duration-300">
              Already have an account? Sign In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
