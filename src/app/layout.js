"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import "./globals.css";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("preloaderShown");

    if (alreadyShown) {
      setLoading(false);
      return;
    }

    sessionStorage.setItem("preloaderShown", "true");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // preloader süresi

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`bg-black text-white ${
          loading ? "overflow-hidden h-screen" : ""
        }`}
      >
        {loading ? (
          <Preloader />
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
