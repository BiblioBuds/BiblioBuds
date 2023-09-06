"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  getCsrfToken,
  getSession,
  getProviders,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [providers, setProviders] = useState({});
  const [csrfToken, setCsrfToken] = useState("");
  const [session, setSession] = useState({});

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

  const router = useRouter();

  useEffect(() => {
    getProviders().then((providers) => {
      setProviders(providers);
      console.log(providers);
    });
    getCsrfToken().then((token) => {
      setCsrfToken(token);
      console.log(token);
    });
    getSession().then((session) => {
      setSession(session);
      console.log(session);
      if (session) {
        router.push("/home");
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signIn("google");
      toast.success("Login successful. Welcome back!");

      // Realiza una redirección asincrónica después del éxito
      redirectToShop();
    } catch (error) {
      toast.error(
        "Oops! There was an error logging into your account with Google. Please try again."
      );
    }
  };

  const redirectToShop = () => {
    setTimeout(() => {
      router.push("/shop");
    }, 100); // Espera 500 milisegundos antes de redirigir
  };

  // TODO: Agregar notificaciones al credential provider
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
          <form
            className="w-full md:space-y-6 lg:space-y-12"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="flex flex-col justify-center items-center space-y-2">
              <input
                className="w-[80%] border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {errors.email ? (
                <span className="text-red-500">{errors.email}</span>
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <input
                className="w-[80%] border p-3 rounded-lg bg-[#f5f5f5] shadow-md"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password ? (
                <span className="text-red-500">{errors.password}</span>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={errors.email || errors.password}
              // onClick={() => console.log(providers)}
              className={`w-[80%] font-lato border rounded-lg bg-[#EA8282] text-white shadow-md p-3 ${
                errors.email || errors.password
                  ? ""
                  : "hover:bg-red-500 hover:tracking-widest"
              } duration-300`}
            >
              Sign In
            </button>
          </form>
          <Link href="/api/auth/register">
            <p className="font-lato md:text-base lg:text-lg hover:underline hover:text-red-500 duration-300 pt-4">
              Don't have an account? Sign Up
            </p>
          </Link>
          <p className="font-lato md:text-base lg:text-lg">Or continue with</p>
          <div className="flex w-[80%]">
            <button
              onClick={() =>
                signIn("github")
                  .then(() => {
                    toast.success("Login successful. Welcome back!");
                  })
                  .catch((error) => {
                    toast.error(
                      "Oops! There was an error login into your account. Please try again."
                    );
                  })
              }
              className="w-full font-lato bg-[#F5F5F5] shadow-md border rounded-lg p-3 flex items-center justify-center hover:bg-[#EA8282] duration-300"
            >
              <img
                className="h-16"
                src="/Media/IMG/github.png"
                alt="Github Logo"
              />
            </button>
            {/* <button
              onClick={() =>
                signIn("facebook")
                  .then(() => {
                    toast.success("Login successful. Welcome back!");
                  })
                  .catch((error) => {
                    toast.error(
                      "Oops! There was an error login into your account. Please try again."
                    );
                  })
              }
              className="w-full font-lato bg-[#F5F5F5] shadow-md border rounded-lg p-3 flex items-center justify-center hover:bg-[#EA8282] duration-300"
            >
              <img
                className="h-16"
                src="/Media/IMG/facebook.png"
                alt="Github Logo"
              />
            </button> */}
            <button
              onClick={handleLogin}
              className="w-full font-lato bg-[#F5F5F5] shadow-md border rounded-lg p-3 flex items-center justify-center hover:bg-[#EA8282] duration-300"
            >
              <img
                className="h-16"
                src="/Media/IMG/google.png"
                alt="Google Logo"
              />
            </button>
          </div>
          <Link href="/shop">
            <p className="font-lato md:text-base lg:text-lg hover:underline hover:text-red-500 duration-300">
              Continue shopping
            </p>
          </Link>
        </div>
        <img
          src="https://w.forfun.com/fetch/77/77b54e73aa6e6aee334586f0a86f7760.jpeg"
          alt="Cover Image"
          className="w-[50%] border-l-2 border-[#C0C0C0] rounded-tr-md rounded-br-md"
        />
      </div>
    </div>
  );
};

export default SignIn;
