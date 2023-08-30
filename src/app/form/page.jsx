"use client";

import NewBookInputs from "@/components/NewBookInputs/NewBookInputs";
import { useGlobalContext } from "../Context/store";

const Form = () => {
  const { genres, formats, languages } = useGlobalContext();

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
