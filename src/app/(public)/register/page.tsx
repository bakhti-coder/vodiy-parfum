import RegisterForm from "@/components/form/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Regsiter",
  description: "Vodiy Parfum | Home - e-commerce website login page. Username, password",
};

const RegisterPage = () => {
  return <section className="container max-w-1200 pt-36">
  <RegisterForm />
</section>;;
};

export default RegisterPage;
