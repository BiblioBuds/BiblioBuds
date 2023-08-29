"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  getCsrfToken,
  getSession,
  getProviders,
  signIn,
} from "next-auth/react";

const SignIn = () => {
  const [providers, setProviders] = useState({});

  useEffect(() => {
    getProviders().then((providers) => {
      setProviders(providers);
      console.log(providers);
    });
  }, []);

  // TODO: Agregar autenticacion al password y al email, mostrar errores
  // TODO: Agregar notificaciones
  // TODO: Conectar con NextAuth
  return (
    <div className="w-full h-screen flex justify-center items-center text-center bg-[#F3F3F3]">
      <div className="min-w-[60%] max-w-[80%] min-h-[70%] max-h-[90%] border-4 border-[#C0C0C0] rounded-lg flex flex-row bg-white">
        <div className="w-full border-r-2 border-[#C0C0C0] flex flex-col justify-evenly items-center">
          <div>
            <h3 className="font-lato md:text-lg lg:text-2xl">Hello Again!</h3>
            <h4 className="font-lato md:text-base lg:text-xl">
              Welcome back you've been missed!
            </h4>
          </div>
          <div className="w-full md:space-y-6 lg:space-y-12">
            <input
              className="w-[80%] border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
              type="text"
              placeholder="Enter email"
            />
            <input
              className="w-[80%] border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
              type="password"
              placeholder="Password"
            />
            <button
              onClick={() => console.log(providers)}
              className="w-[80%] font-lato border rounded-lg bg-[#EA8282] text-white shadow-md p-3 hover:bg-red-500 hover:tracking-widest duration-300"
            >
              Sign In
            </button>
            <Link href="/api/auth/register">
              <p className="font-lato md:text-base lg:text-lg hover:underline hover:text-red-500 duration-300 pt-4">
                Don't have an account? Sign Up
              </p>
            </Link>
          </div>
          <p className="font-lato md:text-base lg:text-lg">Or continue with</p>
          <button
            onClick={() => signIn(providers.github.id)}
            className="w-[80%] font-lato bg-[#F5F5F5] shadow-md border rounded-lg p-3 flex items-center justify-center hover:bg-[#EA8282] duration-300"
          >
            <img
              className="h-16"
              src="/Media/IMG/github.png"
              alt="Github Logo"
            />
          </button>
          <Link href="/shop">
            <p className="font-lato md:text-base lg:text-lg hover:underline hover:text-red-500 duration-300">
              Continue shopping
            </p>
          </Link>
        </div>
        <img
          src="https://w.forfun.com/fetch/77/77b54e73aa6e6aee334586f0a86f7760.jpeg"
          alt="Cover Image"
          className="w-full border-l-2 border-[#C0C0C0] rounded-tr-md rounded-br-md"
        />
      </div>
    </div>
  );
};

export default SignIn;
