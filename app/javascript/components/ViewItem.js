import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";

function ViewItem(props) {
  const [item, setItem] = useState({}); 

  useEffect(() => {
    const requestItem = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items?filter[id]=" + props.itemId);
      const { data } = await response.json();
      setItem(data[0].attributes);
    };
    requestItem();
  }, []);

  return (
    <div>
      <Link to={"/main/category/" + props.categoryId}>Back</Link>
      <h3>Item Details</h3>
      <strong>Content:</strong> {item.content}<br></br>
      <strong>Created at:</strong> {new Date(Date.parse(item["created-at"])).toLocaleTimeString()}, {new Date(Date.parse(item["created-at"])).toDateString()}<br></br>
      <strong>Updated at:</strong> {new Date(Date.parse(item["updated-at"])).toLocaleTimeString()}, {new Date(Date.parse(item["updated-at"])).toDateString()}<br></br>
    </div>
  );
}

export default ViewItem;