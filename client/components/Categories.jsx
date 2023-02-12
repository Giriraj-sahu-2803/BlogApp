import React, { useState, useEffect } from "react";
import { getCategories } from "../services";

import Link from "next/link";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-8 pb-4 border-b ">
        Categories
      </h3>
      {categories.map((category)=>(
        <Link key={category.slug} href={`/categories/${category.slug}` }>
        <span className="cursor-pointer block pb-3 mb-3 text-lg">
          {category.name}
        </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
