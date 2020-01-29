import React from "react";
import { navigate } from "@reach/router";

function DeleteItem(props) {
  const handleDelete = () => {
    const destroyItem = async () => {
      const values = {
        id: props.itemId,
        type: "items"
      };
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/items/" + props.itemId, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
    };
    destroyItem();
    navigate("/main/category/" + props.categoryId);
  };

  const handleBack = () => {
    navigate("/main/category/" + props.categoryId);
  };

  return (
    <div>
      Are you sure you want to complete / delete this item?
      <form onSubmit={handleDelete}>
        <button type="submit">Yes</button>
      </form>
      <form onSubmit={handleBack}>
        <button type="submit">No</button>
      </form>
    </div>
  );
}

export default DeleteItem;