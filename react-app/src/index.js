import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import "./stylesheets/reset.css";
import "./stylesheets/global.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
