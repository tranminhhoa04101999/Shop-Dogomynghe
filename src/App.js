import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Main/Home/HomePage";

import Layout from "./components/Header/Layout";
import ProductDetails from "./components/Main/Products/ProductDetails";
import Cart from "./components/Main/Cart";
import Login from "./components/Main/Login";
import Account from "./components/Main/Account/Account";
import Register from "./components/Main/Register";
import CustomerInfo from "./components/Main/Account/CustomerInfo";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />}>
          <Route path="customerinfo" element={<CustomerInfo />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
