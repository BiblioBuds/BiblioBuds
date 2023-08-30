import NavBar from "@/components/navbar/navbar";
import style from "./global.module.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";
import { ToastContainer } from "react-toastify";

import { GlobalContextProvider } from "./Context/store";
import AuthProvider from "./Context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BiblioBuds",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          autoClose={2500}
          hideProgressBar={true}
          bodyClassName="font-lato text-base"
        />
        <GlobalContextProvider>
          <AuthProvider>
            <NavBar className={style.navcont} />
            {children}
            <Footer />
          </AuthProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
