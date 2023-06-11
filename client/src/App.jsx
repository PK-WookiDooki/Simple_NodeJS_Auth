import React from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={"<h2>Hello, this's home page!</h2>"}></Route>
        <Route
          path="/about"
          element={"<h2>Hello, this's about page!</h2>"}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
