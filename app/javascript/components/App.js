import React from "react";
import { Router } from "@reach/router";
import StartPortal from "./StartPortal";
import Main from "./Main";

// Foundational component of the application
function App() {
  return (
    <Router>
      <StartPortal path="/" default />
      <Main path="/main/*" />
    </Router>
  );
}

export default App;