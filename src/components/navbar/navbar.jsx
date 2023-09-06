"use client";
import { useGlobalContext } from "@/app/Context/store";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUserAlt,
  FaBookMedical,
  FaTimesCircle,
  FaUserCircle,
  FaBars,
  FaBook,
  FaUsers,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import SpeedDialAdmin from "../SpeedDial/SpeedDial";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const {
    setBooks,
    filterGenre,
    filterEditorial,
    filterFormat,
    filterLanguage,
    orderBooks,
    searchInput,
    setSearchInput,
    page,
    setPage,
    size,
  } = useGlobalContext();

  const router = useRouter();
  const pathname = usePathname();

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const searchByQuery = async () => {
    const queryString = new URLSearchParams({
      filterGenre,
      filterFormat,
      filterLanguage,
      filterEditorial,
      orderBooks,
      searchInput,
      page,
      size,
    }).toString();
    setPage(1);
    await axios
      .get("/api/books/filters?" + queryString)
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
      });
    if (searchInput !== "") {
      if (router.pathname !== "/shop") {
        router.push("/shop");
        return;
      }
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      searchByQuery();
    }
  }, [searchInput]);

  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (session) {
      let userId = session.user.id;
      axios
        .get("/api/users/admin?" + userId)
        .then((res) => res.data)
        .then((data) => setIsAdmin(data.role));
      // console.log(isAdmin)
    }
  }, [status, isAdmin]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const goToAccountPage = () => {
    router.push("/account"); // Cambia "/account" con la ruta correcta
    setShowMenu(false); // Cierra el menú después de redirigir
  };
  if (pathname !== "/api/auth/signin" && pathname !== "/api/auth/register") {
    return (
      <nav className="flex flex-wrap items-center justify-between p-2 bg-white md:bg-transparent shadow-lg">
        {pathname !== "/api/auth/signin" &&
          pathname !== "/api/auth/register" && (
            <div className="flex items-center flex-shrink-0 text-black mr-6">
              <img src="/BiblioWhite.png" alt="Logo" className="h-8" />
            </div>
          )}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black"
          >
            <FaBars />
          </button>
        </div>
        <div
          onMouseLeave={() => setShowMenu(false)}
          className={`w-full block flex-grow md:flex md:items-center md:w-auto ${
            showMenu ? "" : "hidden"
          }`}
        >
          <div
            className={`text-sm md:flex flex-grow ${
              showMenu ? "" : "space-x-5"
            }`}
          >
            <div className={`relative ${showMenu ? "mt-2" : null}`}>
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={handleInput}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    searchByQuery();
                  }
                }}
                maxLength={30}
                className={`w-full ${
                  showMenu ? "p-2" : "p-1"
                } pl-8 border rounded border-b-2 border-black`}
              />
              {searchInput ? (
                <FaTimesCircle
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setSearchInput("");
                  }}
                />
              ) : null}
            </div>
            <div className="md:flex flex-grow w-full items-center justify-normal md:justify-center md:space-x-12 space-x-0">
              <Link
                href="/home"
                // className="block mt-4 md:inline-block md:mt-0 text-black mr-4"
                className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                  showMenu
                    ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                    : null
                }`}
              >
                <FaHome className="h-6 w-6" />
                {showMenu ? (
                  <p className="font-bold font-raleway">Home</p>
                ) : null}
              </Link>
              <Link
                href="/shop"
                className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                  showMenu
                    ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                    : null
                }`}
              >
                <FaShoppingBag className="w-6 h-6" />
                {showMenu ? (
                  <p className="font-bold font-raleway">Shop</p>
                ) : null}
              </Link>
              <Link
                href="/cart"
                className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                  showMenu
                    ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                    : null
                }`}
              >
                <FaShoppingCart className="w-6 h-6" />
                {showMenu ? (
                  <p className="font-bold font-raleway">Cart</p>
                ) : null}
              </Link>
            </div>
          </div>
          <div>
            {isAdmin === "ADMIN" && <SpeedDialAdmin />}
            <button
              onClick={toggleProfileMenu}
              className="inline-block text-sm px-4 py-1 leading-none border rounded text-black border-black mt-2 md:mt-0"
            >
              {session ? (
                <div className="relative" style={{}}>
                  <img
                    src={
                      session.user.image ? session.user.image : "/user-icon.jpg"
                    }
                    alt={`${
                      session.user.name ? `${session.user.name}'s` : "your"
                    } profile`}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={toggleProfileMenu}
                  />
                  {isProfileMenuOpen && (
                    <div
                      className="absolute left-0 top-0 md:top-10 md:left-auto md:right-0 bg-white border shadow-md rounded-lg py-1 px-4 space-y-2"
                      onMouseLeave={closeProfileMenu}
                    >
                      <Link
                        onClick={goToAccountPage}
                        href="/account"
                        className="text-gray-600 hover:text-gray-900 block"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="text-gray-600 hover:text-gray-900 block"
                      >
                        My orders
                      </Link>
                      <Link
                        href="/api/auth/signout" // Llama a la función de logout
                        className="text-gray-600 hover:text-gray-900 block w-full text-left"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:text-[#87C6E9] transition duration-300"
                >
                  Log In
                </Link>
              )}
            </button>
          </div>
        </div>
      </nav>
    );
  }
};
export default Navbar;
