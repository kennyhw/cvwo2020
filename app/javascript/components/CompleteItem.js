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
    <div class="card border border-success w-75 h-100 shadow">
      <div class="card-body d-flex flex-column no-gutters">
        <div class="row">
          <div class="col-md-12 text-center">
            <h4 class="card-title text-success">Item completed?</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <hr class="mt-0"></hr>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 text-right">
            <form onSubmit={handleComplete}>
              <button class="btn btn-block btn-success text-white" type="submit">Yes</button>
            </form>
          </div>
          <div class="col-md-6 text-left">
            <form onSubmit={handleBack}>
              <button class="btn btn-block btn-success text-white" type="submit">No</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteItem;