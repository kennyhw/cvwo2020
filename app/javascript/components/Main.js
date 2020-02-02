import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import ItemIndex from "./ItemIndex";
import AddItem from "./AddItem";
import ViewItem from "./ViewItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import { Octicon, Octicons } from "octicons-react";

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
    <div>
      <nav class="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2">
              <span class="navbar-brand">
                <Octicon icon={Octicons.checklist} className="text-white" scale={3.5} />
              </span>
            </div>
            <div class="col-md-10">
              <span class="navbar-brand"> 
              <h3>CheckMark</h3><h4 class="small">Task Management Application</h4></span>
            </div>
          </div>
        </div>
      </nav>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h3 class="featurette"><strong>Categories</strong></h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Link to="/add" className="btn btn-outline-primary btn-sm">
              New Category <Octicon icon={Octicons.diff} scale={1.2} className="align-text-bottom" />
            </Link>
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
                    <Link className="btn btn-primary mr-1" to={"category/" + category.id}>
                      <Octicon icon={Octicons.listUnordered} className="align-baseline" />
                    </Link>{" "}
                    <Link className="btn btn-primary mr-1" to={"/edit/" + category.id}>
                      <Octicon icon={Octicons.pencil} className="align-baseline" />
                    </Link>{" "}
                    <Link className="btn btn-primary mr-1" to={"/delete/" + category.id}>
                      <Octicon icon={Octicons.trashcan} className="align-baseline" />
                    </Link>
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
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div class="container-fluid">
          <div class="d-flex bd-highlight justify-content-between">
            <span class="text-muted text-center small">
              <a class="nonunderline" href="https://github.com/kennyhw/cvwo2020">Maintained on <Octicon icon={Octicons.logoGithub} className="align-bottom" />{" "}
              <Octicon icon={Octicons.markGithub} className="align-bottom" /> </a>| Made for
              CVWO2020 Assignment
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Main;