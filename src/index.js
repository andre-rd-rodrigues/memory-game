import React from "react";
import ReactDOM from "react-dom";
import App from "App/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "configureStore";

const store = configureStore();

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
