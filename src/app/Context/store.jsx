"use client";

const { createContext, useContext, useState } = require("react");

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
