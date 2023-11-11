import { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Home",
  description: "Vodiy Parfum | Home - e-commerce website",
};

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
