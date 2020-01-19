import React from "react";
import { Router } from "@reach/router";
import CategoryList from "./CategoryList";

function App() {
  return (
    <Router>
      <CategoryList path="/" />
    </Router>
  );
}

export default App;