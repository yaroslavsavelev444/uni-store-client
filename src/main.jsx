import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./components/styles/globalStyles.css";
import App from "./App";
import Store from "./store/store";
import AdminStore from "./store/admin-store";
import ProductStore from "./store/product-store";
export const store = new Store();
export const adminStore = new AdminStore();
export const productStore = new ProductStore();
export const Context = createContext({
  store,adminStore, productStore
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ store, adminStore, productStore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
