import React, { Fragment } from "react";

import Children from "@/types/children";

const AdminLayout = ({ children }: Children) => {
  return <Fragment>{children}</Fragment>;
};

export default AdminLayout;
