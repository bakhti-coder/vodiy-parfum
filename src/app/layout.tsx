import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Children from "@/types/children";
import { ToastContainer } from 'react-toastify';
import Provider from "./provider";

import "swiper/css";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import AosProvider from "@/components/animation/aos";


const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vodiy parfum",
  description: "Vodiy Parfum | Typescript Project",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <ToastContainer />
      <body className={roboto.className}>
        <Provider>
          <AosProvider>{children}</AosProvider> 
        </Provider>
      </body>
    </html>
  );
}
