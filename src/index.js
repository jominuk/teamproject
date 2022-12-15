import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";


if(process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();



