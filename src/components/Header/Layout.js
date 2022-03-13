import React, { createContext, Fragment, useContext, useState } from 'react';
import Footer from '../Footer/Footer';
import MainNavigation from './MainNavigation';

export const ContextContainer = createContext();

const Layout = (props) => {
  const [reloadContext, setReloadContext] = useState(false);
  return (
    <ContextContainer.Provider
      value={{
        reloadContext: reloadContext,
        setReloadContext: setReloadContext,
      }}
    >
      <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
        <Footer />
      </Fragment>
    </ContextContainer.Provider>
  );
};

export default Layout;
