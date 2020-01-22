import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

function Main() {
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
      <h1>CheckMark</h1>
      <nav>
        <Link to="/add">New Category</Link>
      </nav>
      {categories.map(category => <div><strong>{category.attributes.title}</strong> | {category.attributes.description}</div>)}
    </div>
  );
}

export default Main;