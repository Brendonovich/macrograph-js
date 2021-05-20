import React from "react";
import ReactDOM from "react-dom";
import { importPackages } from "./utils";
import "./index.css";
import App from "./App";

importPackages();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
