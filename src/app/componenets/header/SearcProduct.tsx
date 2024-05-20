"use client";
import Link from "next/link";
import { useState } from "react";

const SearcProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="text"
        name="search"
        id="search"
        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none md:flex"
        placeholder="search"
      />
      <Link
        href={{
            pathname: '/shop',
            query: { searchTerm: `${searchTerm}` },
          }}
        className="bg-primary border border-primary text-white px-8ff rounded-r-md hover:bg-transparent hover:text-primary transition md:flex"
      >
        Search
      </Link>
    </>
  );
};

export default SearcProduct;
