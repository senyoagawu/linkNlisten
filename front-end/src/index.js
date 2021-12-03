import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./stylesheets/reset.css";
import "./stylesheets/global.css";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
