"use client";
import { useEffect, useState } from "react";
import validateForm from "../../../utils/validateForm";

const NewBookInputs = ({ bookGenres, languages, formats }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    editorial: "",
    genres: "",
    price: 0,
    pages: 0,
    languages: "",
    formats: "",
    stock: 0,
    date: "",
    image: "",
    synopsis: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    editorial: "",
    genres: "",
    price: "",
    pages: "",
    languages: "",
    formats: "",
    stock: "",
    date: "",
    image: "",
    synopsis: "",
  });

  useEffect(() => {
    setErrors(validateForm({ ...book }));
  }, [book]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // const newValue = name === "price" ? parseFloat(value) : value;
    setBook({ ...book, [name]: value });
    console.log(book);
  };

  const disabled = () => {
    let disable = true;
    for (let error in errors) {
      if (errors[error] === "") disable = false;
      else {
        disable = true;
        break;
      }
    }
    return disable;
  };

  let postBook = async (book) => {
    console.log(book);
    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    postBook({
      ...book,
      genres: [book.genres],
      formats: [book.formats],
      languages: [book.languages],
      price: Number(book.price),
      pages: Number(book.pages),
      stock: Number(book.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-slate-900 text-3xl text-center mt-3">
        {" "}
        Upload a new Book
      </h1>
      <div className="mx-4 mt-3 h-20 grid grid-cols-3 gap-5 justify-center">
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Title</h1>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={book.title}
            placeholder="Harry Potter and the Philosopher's Stone"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.title}
          </p>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Author</h1>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={book.author}
            placeholder="J.K. Rowling"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.author}
          </p>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Editorial</h1>
          <input
            type="text"
            name="editorial"
            onChange={handleChange}
            value={book.editorial}
            placeholder="Bloomsbury"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.editorial}
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 h-20 grid grid-cols-3 gap-5">
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Genre</h1>
          <select
            id="genres"
            name="genres"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8  hover:bg-stone-200"
            onChange={handleChange}
          >
            <option value={book.genres}>Select Genre</option>
            {bookGenres.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Price</h1>
          <input
            type="number"
            name="price"
            min={0}
            onChange={handleChange}
            value={book.price}
            placeholder="15.99"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.price}
          </p>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Num. Pages</h1>
          <input
            type="number"
            name="pages"
            min={0}
            onChange={handleChange}
            value={book.pages}
            placeholder="223"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.pages}
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 h-20 grid grid-cols-3 gap-5">
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Language</h1>
          <select
            id="languages"
            name="languages"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8  hover:bg-stone-200"
            onChange={handleChange}
          >
            <option value={book.languages}>Select Language</option>
            {languages.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Formats</h1>
          <select
            id="formats"
            name="formats"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200"
            onChange={handleChange}
          >
            <option value={book.formats}>Select Format</option>
            {formats.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Stock</h1>
          <input
            type="number"
            name="stock"
            min={0}
            onChange={handleChange}
            value={book.stock}
            placeholder="20"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.stock}
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 h-20 grid grid-cols-2 gap-5">
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Publishing Date</h1>
          <input
            type="text"
            name="date"
            onChange={handleChange}
            value={book.date}
            placeholder="1997-07-26"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.date}
          </p>
        </div>
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Image</h1>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={book.image}
            placeholder="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-8 hover:bg-stone-200 p-2 placeholder:italic"
          ></input>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.image}
          </p>
        </div>
      </div>
      <div className="mx-4 mt-4 h-24 grid grid-cols-1 gap-5 mb-6">
        <div className="justify-center flex flex-col">
          <h1 className="text-black text-center pb-1">Synopsis</h1>
          <textarea
            type="text"
            name="synopsis"
            onChange={handleChange}
            value={book.synopsis}
            placeholder="Harry Potter lives with his abusive aunt and uncle, Vernon and Petunia Dursley, and their bullying son, Dudley. On Harry's eleventh birthday, a half-giant named Rubeus Hagrid personally delivers an acceptance letter to Hogwarts School of Witchcraft and Wizardry, revealing that Harry's parents, James and Lily Potter, were wizards."
            className="text-black justify-center mx-2 rounded-lg bg-stone-100 shadow-slate-600 shadow-md h-20 resize-none box-border pl-2 hover:bg-stone-200 p-2 placeholder:italic"
          ></textarea>
          <p className="align-bottom text-center text-red-500 text-sm mt-1">
            {errors.synopsis}
          </p>
        </div>
      </div>
      <div className="w-[97%] grid grid-cols-1 justify-items-center">
        <button
          type="submit"
          //  disabled={disabled()}
          className="mb-3 mt-4 bg-red-400 w-36 h-10 rounded-lg text-white border-red-500 hover:border-2 "
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default NewBookInputs;
