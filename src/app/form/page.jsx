"use client";

import NewBookInputs from "@/components/NewBookInputs/NewBookInputs";
import axios from "axios";
import { useEffect } from "react";
import { useGlobalContext } from "../Context/store";

const Form = () => {
  const { genres, setGenres, formats, setFormats, languages, setLanguages } =
    useGlobalContext();

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((res) => res.data)
      .then((data) => {
        setGenres(data);
      });
    axios
      .get("/api/formats")
      .then((res) => res.data)
      .then((data) => {
        setFormats(data);
      });
    axios
      .get("/api/languages")
      .then((res) => res.data)
      .then((data) => {
        setLanguages(data);
      });
  }, []);

  //   console.log(bookGenres, languages, formats);

  return (
    <div className="h-full w-screen grid grid-cols-1 mb-14">
      <div className="mt-14 w-[95%] bg-neutral-100 place-self-center rounded-xl border-gray-400 border-[1px]">
        <NewBookInputs
          bookGenres={genres.map((e) => e.genre)}
          languages={languages.map((e) => e.language)}
          formats={formats.map((e) => e.format)}
        />
      </div>
    </div>
  );
};
export default Form;
