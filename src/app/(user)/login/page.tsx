import LoginForm from "@/components/form/LoginForm";
import { Metadata } from "next";

import './login.scss';

export const metadata: Metadata = {
  title: "Vodiy Parfum | Login",
  description: "Vodiy Parfum | Home - e-commerce website login page. Username, password",
};

const LoginPage = () => {
  return <section className="container max-w-1200 pt-36">
    <LoginForm />
  </section>;
};

export default LoginPage;
