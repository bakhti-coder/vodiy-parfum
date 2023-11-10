import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Children from "@/types/children";

import "swiper/css";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce project | Typescript",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
