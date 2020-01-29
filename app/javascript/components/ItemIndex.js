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
      <Link to="new-item">New Item</Link>
      <ol>
        {items.map(item => <li>{item.attributes.content}{" | "}
                           <Link to={"view-item/" + item.id}>View</Link>{" "}
                           <Link to={"edit-item/" + item.id}>Edit</Link>{" "}
                           <Link to={"delete-item/" + item.id}>Complete / Delete</Link>{" "}
                           </li>)}
      </ol>
    </div>
  );
}

export default ItemIndex;