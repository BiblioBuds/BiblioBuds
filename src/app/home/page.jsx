"use client";
import { useGlobalContext } from "@/app/Context/store";
import { Carousel } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const ProductCard = ({ book }) => {
  return (
    <div className="flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border border-black">
      <div className="mx-4 mt-4 h-[35rem] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {book.title}
        </h4>
        <p className="block bg-gradient-to-tr from-gray-700 to-gray-500 italic bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export const Home = () => {
  const { books } = useGlobalContext();

  const router = useRouter();

  return (
    <div className="w-full">
      <div className="space-y-4">
        <h1 className="font-inter tracking-widest font-semibold text-center text-3xl p-2">
          WELCOME TO <span className="text-indigo-400">BIBLIOBUDS!</span>
        </h1>
        <Carousel loop={true} autoplay={true} className="h-[35rem]">
          <img
            src="https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
        </Carousel>
        {/* <h2 className="font-inter text-xl p-3">
          Some of our most sold products:
        </h2> */}
        <div className="flex flex-grow flex-row md:col-span-3 col-span-1 w-full justify-evenly">
          {books?.length > 0
            ? books?.books
                ?.sort((a, b) => a.stock - b.stock)
                .slice(0, 4)
                .map((book) => <ProductCard book={book} />)
            : null}
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => router.push("/shop")}
            className="mb-4 border border-black rounded text-center px-6 py-3 font-inter tracking-widest underline hover:bg-black hover:text-white duration-200"
          >
            GO SHOPPING!
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
