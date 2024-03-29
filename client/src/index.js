import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);
