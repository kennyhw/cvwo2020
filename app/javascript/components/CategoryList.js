import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch("/api/categories");
      const { data } = await response.json();
      setCategories(data);
    };
    requestCategory();
  }, []);

  return (
    <div>
      <h1>Hello!</h1>
      <nav>
        <Link to="/add">Click</Link>
      </nav>
      {categories.map(category => <div><strong>{category.attributes.title}</strong> | {category.attributes.description}</div>)}
    </div>
  );
}

export default CategoryList;