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
    <div>
      <h1>CheckMark</h1>
      <hr></hr>
      <nav>
        <Link to="/add">New Category</Link>
      </nav>
      <ul>
        {categories.map(category => <li><strong>{category.attributes.title}</strong>{" "}
                                    <Link to={"category/" + category.id}>View</Link>{" "}
                                    <Link to={"/edit/" + category.id}>Edit</Link>{" "}
                                    <Link to={"/delete/" + category.id}>Delete</Link>
                                    </li>)}
      </ul>
      <hr></hr>
      <Router>
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