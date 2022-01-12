import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
