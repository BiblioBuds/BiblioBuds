import React from "react";
import Filters from "@/components/filters/Filters";
import Cards from "@/components/cards/Cards";
import Pagination from "@/components/pagination/Pagination";

const Shop = () => {
  return (
    <div className="flex">
      <div className="p-4">
        <Filters />
      </div>
      <div className="p-4 w-full">
        <div className=" space-y-5">
          <Cards />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Shop;
