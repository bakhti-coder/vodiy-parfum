import React, { Fragment } from "react";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Children from "@/types/children";

const PublicLayout = ({ children }: Children) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;
