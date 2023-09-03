"use client";
import { useGlobalContext } from "@/app/Context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
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
    if (router.pathname !== "/shop") {
      router.push("/shop");
      return;
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      searchByQuery();
    }
  }, [searchInput]);

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

  return (
    <nav className="flex flex-wrap items-center justify-between p-2 bg-white md:bg-transparent shadow-lg">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <img src="/BiblioWhite.png" alt="Logo" className="h-8" />
      </div>
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
          className={`text-sm md:flex flex-grow ${showMenu ? "" : "space-x-5"}`}
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
          <div className="md:flex flex-grow w-full items-center justify-normal md:justify-center md:space-x-5 space-x-0">
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
              {showMenu ? <p className="font-bold font-raleway">Home</p> : null}
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
              {showMenu ? <p className="font-bold font-raleway">Shop</p> : null}
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
              {showMenu ? <p className="font-bold font-raleway">Cart</p> : null}
            </Link>
            <Link
              href="/form"
              className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                showMenu
                  ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                  : null
              }`}
            >
              <FaBookMedical className="h-6 w-6" />
              {showMenu ? <p className="font-bold font-raleway">Form</p> : null}
            </Link>
            <Link
              href="/dashboard/books"
              className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                showMenu
                  ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                  : null
              }`}
            >
              <FaBook className="h-6 w-6" />
              {showMenu ? (
                <p className="font-bold font-raleway">Books</p>
              ) : null}
            </Link>
            <Link
              href="/dashboard/users"
              className={`flex items-center mt-2 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                showMenu
                  ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                  : null
              }`}
            >
              <FaUsers className="w-6 h-6" />
              {showMenu ? (
                <p className="font-bold font-raleway">Users</p>
              ) : null}
            </Link>
            <Link
              href="/dashboard/orders"
              className={`flex items-center mt-2 mr-1 md:mt-0 text-black hover:bg-black hover:text-white md:hover:text-[#87C6E9] md:hover:bg-transparent duration-300 ${
                showMenu
                  ? "border-black border shadow-md rounded py-2 px-4 space-x-2"
                  : null
              }`}
            >
              <FaBookOpen className="w-6 h-6" />
              {showMenu ? (
                <p className="font-bold font-raleway">Orders</p>
              ) : null}
            </Link>
          </div>
        </div>
        <div>
          <button
            onClick={toggleProfileMenu}
            className="inline-block text-sm px-4 py-1 leading-none border rounded text-black border-black mt-2 md:mt-0"
          >
            {session ? (
              <div className="relative" style={{}}>
                <img
                  src={session.user.image}
                  alt={`${session.user.name}'s profile`}
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
                      href="/myshopping"
                      className="text-gray-600 hover:text-gray-900 block"
                    >
                      Shopping
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
                className="py-2 px-2 font-medium text-gray-500 rounded hover:text-white transition duration-300"
              >
                Log In
              </Link>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  // return (
  //   <nav className="bg-white shadow-lg">
  //     <div className="max-w-6xl mx-auto px-4">
  //       <div className="flex justify-between">
  //         {/* Left Section */}
  //         <div className="flex w-1/3">
  //           <div className="flex space-x-1 justify-center items-center">
  //             <Link href="/" className="flex items-center px-2">
  //               <img src="/BiblioWhite.png" alt="Logo" className="h-8" />
  //             </Link>
  //             <div className="relative">
  //               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
  //               <input
  //                 type="text"
  //                 value={searchInput}
  //                 onChange={handleInput}
  //                 onKeyPress={(event) => {
  //                   if (event.key === "Enter") {
  //                     searchByQuery();
  //                   }
  //                 }}
  //                 maxLength={30}
  //                 className="p-1 pl-8 border rounded border-b-2 border-black w-52"
  //               />
  //               {searchInput ? (
  //                 <FaTimesCircle
  //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
  //                   onClick={() => {
  //                     setSearchInput("");
  //                   }}
  //                 />
  //               ) : null}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Middle Section */}
  //         <div className="hidden md:flex items-center space-x-1 w-1/3">
  //           <Link
  //             href="/home"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaHome className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/shop"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaShoppingBag className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/cart"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaShoppingCart className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/form"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaBookMedical className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/dashboard/books"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaBook className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/dashboard/users"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaUsers className="w-6 h-6" />
  //           </Link>
  //           <Link
  //             href="/dashboard/orders"
  //             className="py-4 px-3 text-black hover:text-cyan-600 duration-300"
  //           >
  //             <FaBookOpen className="w-6 h-6" />
  //           </Link>
  //         </div>

  //         {/* Right Section */}
  //         <div className="hidden md:flex items-center space-x-3">
  //           {session ? (
  //             <div className="relative" style={{ zIndex: 1000 }}>
  //               <img
  //                 src={session.user.image}
  //                 alt={`${session.user.name}'s profile`}
  //                 className="w-8 h-8 rounded-full cursor-pointer"
  //                 onClick={toggleProfileMenu}
  //               />
  //               {isProfileMenuOpen && (
  //                 <div
  //                   className="absolute top-10 right-0 bg-white border shadow-md rounded-lg py-2 px-4 space-y-2"
  //                   onMouseLeave={closeProfileMenu}
  //                 >
  //                   <Link
  //                   onClick={goToAccountPage}
  //                     href="/account"
  //                     className="text-gray-600 hover:text-gray-900 block"
  //                   >
  //                     My Account
  //                   </Link>
  //                   <Link
  //                     href="/myshopping"
  //                     className="text-gray-600 hover:text-gray-900 block"
  //                   >
  //                     Shopping
  //                   </Link>
  //                   <Link
  //                     href="/api/auth/signout" // Llama a la función de logout
  //                     className="text-gray-600 hover:text-gray-900 block w-full text-left"
  //                   >
  //                     Logout
  //                   </Link>

  //                 </div>
  //               )}
  //             </div>
  //           ) : (
  //             <Link
  //               href="/api/auth/signin"
  //               className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
  //             >
  //               Log In
  //             </Link>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </nav>
  // );
};
export default Navbar;
