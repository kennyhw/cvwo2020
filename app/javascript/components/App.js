import React from "react";
import { Router } from "@reach/router";
import StartPortal from "./StartPortal";
import Main from "./Main";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

function App() {
  return (
    <Router>
      <StartPortal path="/" default />
      <Main path="/main/*" />
      <AddCategory path="/add" />
      <EditCategory path="/edit/:categoryId" />
      <DeleteCategory path="/delete/:categoryId" />
    </Router>
  );
}

export default App;