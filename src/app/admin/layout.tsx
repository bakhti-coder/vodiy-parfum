'use client'

import React, { Fragment } from "react";

import Children from "@/types/children";
import useAuthCheck from "@/hooks/auth-check";

const AdminLayout = ({ children }: Children) => {
  useAuthCheck()
  return <Fragment>{children}</Fragment>;
};

export default AdminLayout;
