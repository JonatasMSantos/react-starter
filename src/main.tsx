import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home/home.page";
import "./styles/global.css";

import { Provider } from "react-redux";
//import store from "./redux/without-toolkit/store";
import store from "./redux/with-toolkit/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/login";
import Tasks from "./pages/Tasks/Task";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login/:teste",
    element: <Login />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
