import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Main/Home/HomePage';

import Layout from './components/Header/Layout';
import ProductDetails from './components/Main/Products/ProductDetails';
import Cart from './components/Main/Cart';
import Login from './components/Main/Login';
import Account from './components/Main/Account/Account';
import Register from './components/Main/Register';
import AccoutAddress from './components/Main/Account/AccountAddress';
import Product from './components/Main/Products/Product';
import SearchOrder from './components/Main/Order/SearchOrder';
import OrderHistory from './components/Main/Account/OrderHistory';
import UpdatePassword from './components/Main/Account/UpdatePassword';

export const LINKCONNECT_BASE = 'http://localhost:8080';
export const LINKIMG_BASE =
  'https://firebasestorage.googleapis.com/v0/b/image-kddgmn-52ebf.appspot.com/o/images%2F';

function App() {
  const clgReload = () => {
    // console.log('reload');
  };
  return (
    <Layout reload={clgReload}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />}>
          <Route path="address" element={<AccoutAddress />} />
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="updatePassword" element={<UpdatePassword />} />
        </Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/productDetails" element={<ProductDetails reload={clgReload} />} />
        <Route path="/searchOrder" element={<SearchOrder />} />
        <Route path="*" element={<HomePage to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
