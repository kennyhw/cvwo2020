import React from "react";
import { navigate } from "@reach/router";
import { Octicon, Octicons } from "octicons-react";

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
    <div class="card border border-secondary w-75 h-100">
      <div class="card-body d-flex flex-column no-gutters">
        <div class="row">
          <div class="col-md-12 text-center">
            <h4 class="card-title text-secondary">Are you sure you want to delete this category?</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <hr class="mt-0"></hr>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 text-right">
            <form onSubmit={handleDelete}>
              <button class="btn btn-block btn-secondary text-white" type="submit">Yes</button>
            </form>
          </div>
          <div class="col-md-6 text-left">
            <form onSubmit={handleBack}>
              <button class="btn btn-block btn-secondary text-white" type="submit">No</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;