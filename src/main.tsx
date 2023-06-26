import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home";
import "./styles/global.css";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>
);
