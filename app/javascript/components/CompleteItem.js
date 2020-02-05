import React from "react";
import { navigate } from "@reach/router";

function CompleteItem(props) {
  const handleComplete = (e) => {
    e.preventDefault();
    const completeItem = async () => {
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
      if (response.status === 204) {
        navigate("/main/category/" + props.categoryId);
      }
    };
    completeItem();
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/main/category/" + props.categoryId);
  };

  return (
    <div>
      Are you sure you want to complete this item?
      <form onSubmit={handleComplete}>
        <button type="submit">Yes</button>
      </form>
      <form onSubmit={handleBack}>
        <button type="submit">No</button>
      </form>
    </div>
  );
}

export default CompleteItem;