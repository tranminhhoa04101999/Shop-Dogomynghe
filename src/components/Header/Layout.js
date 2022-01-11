import { Header } from "antd/lib/layout/layout";
import React, { Fragment } from "react";
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
