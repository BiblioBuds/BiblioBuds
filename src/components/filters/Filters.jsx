"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const Filters = () => {
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setGenres(data);
      });
    axios
      .get("/api/formats")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setFormats(data);
      });
    axios
      .get("/api/languages")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setLanguages(data);
      });
    axios
      .get("/api/editorials")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setEditorials(data);
      });
    // return () => {
    setLoading(false);
    // };
  }, []);

  return (
    <div className="grid grid-cols-1 divide-y-2">
      <div>
        <h2 className="font-bold">Categories</h2>
        <h3 className="font-semibold">Genre</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          genres.map((genre) => (
            <button className="text-xs">{genre.genre}</button>
          ))
        )}
      </div>

      <div>
        <h3 className="font-semibold">Format</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          formats.map((format) => (
            <button className="text-xs">{format.format}</button>
          ))
        )}
      </div>
      <div>
        <h3 className="font-semibold">Language</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          languages.map((language) => (
            <button className="text-xs">{language.language}</button>
          ))
        )}
      </div>
      <div>
        <h3 className="font-semibold">Editorial</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          editorials.map((editorial) => (
            <button className="text-xs">{editorial.editorial}</button>
          ))
        )}
      </div>
    </div>
  );
};

export default Filters;
