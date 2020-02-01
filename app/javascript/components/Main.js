import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import ItemIndex from "./ItemIndex";
import AddItem from "./AddItem";
import ViewItem from "./ViewItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

function Main() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestCategories = async () => {
      const response = await fetch("/api/categories");
      const { data } = await response.json();
      setCategories(data);
    };
    requestCategories();
  }, []);

  return (
    <div class="container-fluid">
      <div class="row card bg-primary text-white h-100 card-body d-flex flex-column align-items-start">
        <div class="col-md-12 text-center"><h1>CheckMark</h1></div>
        <div class="col-md-12 text-center"><h4><small>Task Management Application</small></h4></div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-12">
          <h3 class="featurette"><strong>Categories</strong></h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Link to="/add">New Category</Link>
        </div>
      </div>
      <br></br>
      <table class="table table-hover">
        {categories.map(category => 
          <tr>
            <td>
              <div class="row">
                <div class="col-md-3 navbar-brand">
                  <strong>{category.attributes.title}</strong>
                </div>
                <div class="col-md-3 col-md-offset-1">
                  <Link className="btn btn-primary mr-1" to={"category/" + category.id}>View</Link>{" "}
                  <Link className="btn btn-primary mr-1" to={"/edit/" + category.id}>Edit</Link>{" "}
                  <Link className="btn btn-primary mr-1" to={"/delete/" + category.id}>Delete</Link>
                </div>
              </div>
            </td>
          </tr>
        )}
      </table>
      <hr class="divider"></hr>
      <Router primary={false}>
        <AddItem path="category/:categoryId/new-item" />
        <ItemIndex path="category/:categoryId" />
        <ViewItem path="category/:categoryId/view-item/:itemId" />
        <EditItem path="category/:categoryId/edit-item/:itemId" />
        <DeleteItem path="category/:categoryId/delete-item/:itemId" />
      </Router>
    </div>
  );
}

export default Main;