import React from "react";
import { Router } from "@reach/router";
import StartPortal from "./StartPortal";
import Main from "./Main";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

function App() {
  return (
    <Router>
      <StartPortal path="/" default />
      <Main path="/main">
        <EditCategory path=":categoryId" />
      </Main>
      <AddCategory path="/add" />
    </Router>
  );
}

export default App;