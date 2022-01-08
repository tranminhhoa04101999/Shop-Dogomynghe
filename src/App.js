import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TrangChu from "./components/Main/TrangChu";
import KhamPha from "./components/Main/KhamPha";

import Layout from "./components/Header/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/khampha" element={<KhamPha />} />
      </Routes>
    </Layout>
  );
}

export default App;
