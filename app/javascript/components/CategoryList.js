import React, { useEffect, useState } from "react";

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

  return categories.map(category => <div>{category.attributes.title} | {category.attributes.description}</div>);
}

export default CategoryList;