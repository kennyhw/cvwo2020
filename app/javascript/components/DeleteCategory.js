import React from "react";
import { navigate } from "@reach/router";

function DeleteCategory(props) {
  const handleDelete = (e) => {
    e.preventDefault();
    const destroyCategory = async () => {
      const values = {
        id: props.categoryId,
        type: "categories"
      };
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/categories/" + props.categoryId, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 204) {
        navigate("/main");
      }
    };
    destroyCategory();
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/main");
  };

  return (
    <div>
      Are you sure you want to delete this category?
      <form onSubmit={handleDelete}>
        <button type="submit">Yes</button>
      </form>
      <form onSubmit={handleBack}>
        <button type="submit">No</button>
      </form>
    </div>
  );
}

export default DeleteCategory;