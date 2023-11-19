import LoginForm from "@/components/form/LoginForm";
import { Metadata } from "next";

import './login.scss';
import PageTransitionProvider from "@/components/animation/page-transition";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Login",
  description: "Vodiy Parfum | Home - e-commerce website login page. Username, password",
};

const LoginPage = () => {
  return (
    <PageTransitionProvider>
      <section className="container max-w-1200 pt-36">
        <LoginForm />
      </section>;
    </PageTransitionProvider>
  )
};

export default LoginPage;
