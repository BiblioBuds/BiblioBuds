"use client";

import axios from "axios";

const { createContext, useContext, useState, useEffect } = require("react");

const GlobalContext = createContext({
  books: [],
  setBooks: () => [],
  filteredBooks: [],
  setFilteredBooks: () => [],
  genres: [],
  setGenres: () => [],
  editorials: [],
  setEditorials: () => [],
  formats: [],
  setFormats: () => [],
  languages: [],
  setLanguages: () => [],
  filterGenre: "",
  setFilterGenre: () => "",
  filterEditorial: "",
  setFilterEditorial: () => "",
  filterFormat: "",
  setFilterFormat: () => "",
  filterLanguage: "",
  setFilterLanguage: () => "",
  orderBooks: "",
  setOrderBooks: () => "",
  searchInput: "",
  setSearchInput: () => "",
  page: 1,
  setPage: () => 0,
  size: 12,
  setSize: () => 0,
});

export const GlobalContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [formats, setFormats] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterEditorial, setFilterEditorial] = useState("");
  const [filterFormat, setFilterFormat] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [orderBooks, setOrderBooks] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);

  useEffect(() => {
    console.log("State Refresh");
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
    axios
      .get("/api/books/filters?" + queryString)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setBooks(data);
        setPage(1);
      });
    axios
      .get("/api/genres")
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setGenres(data);
      });
    axios
      .get("/api/formats")
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setFormats(data);
      });
    axios
      .get("/api/languages")
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setLanguages(data);
      });
    axios
      .get("/api/editorials")
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setEditorials(data);
      });
  }, [filterGenre, filterFormat, filterLanguage, filterEditorial, orderBooks]);

  useEffect(() => {
    console.log("Page Change");
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
    axios
      .get("/api/books/filters?" + queryString)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setBooks(data);
      });
  }, [page]);

  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        filteredBooks,
        setFilteredBooks,
        genres,
        setGenres,
        editorials,
        setEditorials,
        formats,
        setFormats,
        languages,
        setLanguages,
        filterGenre,
        setFilterGenre,
        filterEditorial,
        setFilterEditorial,
        filterFormat,
        setFilterFormat,
        filterLanguage,
        setFilterLanguage,
        orderBooks,
        setOrderBooks,
        searchInput,
        setSearchInput,
        page,
        setPage,
        size,
        setSize,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
