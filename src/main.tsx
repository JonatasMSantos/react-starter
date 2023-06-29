import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home/home.page";
import "./styles/global.css";

import { Provider } from "react-redux";
//import store from "./redux/without-toolkit/store";
import store from "./redux/with-toolkit/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>
);
