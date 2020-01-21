import React from "react";
import { Router } from "@reach/router";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";

function App() {
  return (
    <Router>
      <CategoryList path="/" />
      <AddCategory path="/add" />
    </Router>
  );
}

export default App;