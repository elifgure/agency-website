"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sayfa ilk açılırken scroll KAPALI
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Preloader TAMAMEN GİDİNCE scroll AÇ
          document.body.style.overflow = "auto";
        }}
      >
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <main>
        <Hero show={!loading} />
        {!loading && <AboutSection />}
      </main>
    </>
  );
}
