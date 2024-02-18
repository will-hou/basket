import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "./.config.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemList from "./views/ItemList.jsx";
import ItemDetailView from "./views/ItemDetailView.jsx";
import CartContext from "./contexts/CartContext.js";
import CheckoutView from "./views/CheckoutView.jsx";
import ConfirmationView from "./views/ConfirmationView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/items", element: <ItemList /> },
  { path: "/item_description", element: <ItemDetailView /> },
  { path: "/checkout", element: <CheckoutView /> },
  { path: "/confirmation", element: <ConfirmationView /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <CartContext.Provider value={{ cart: new Set() }}>
        <RouterProvider router={router} />
      </CartContext.Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
