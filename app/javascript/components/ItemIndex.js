import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";

function ItemIndex(props) {
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch("/api/categories?filter[id]=" + props.categoryId);
      const { data } = await response.json();
      setCategory(data[0].attributes);
    };
    const requestItems = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items");
      const { data } = await response.json();
      setItems(data);
    };
    requestCategory();
    requestItems();
  }, [props.categoryId]);

  return (
    <div>
      <h3>{category.title}</h3>
      <h4>{category.description}</h4>
      <ol>
        {items.map(item => <li>{item.attributes.content}</li>)}
      </ol>
    </div>
  );
}

export default ItemIndex;