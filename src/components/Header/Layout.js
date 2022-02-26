import React, { Fragment } from 'react';
import Footer from '../Footer/Footer';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation reload={props.reload} />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
