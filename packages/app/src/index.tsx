import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { importPackages } from "./utils";
import "./index.css";
import App from "./App";
import { initialize } from "@mg/core";

importPackages();
initialize();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
