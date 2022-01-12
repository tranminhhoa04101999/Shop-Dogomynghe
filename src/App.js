import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Main/Home/HomePage";

import Layout from "./components/Header/Layout";
import ProductDetails from "./components/Main/Products/ProductDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
