"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import BrandMarquee from "@/components/BrandMarquee";
import TalentShowcase from "@/components/TalentShowcase";
import WhyUs from "@/components/WhyUs";

export default function Page() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const navigationType = navigationEntries[0]?.type;

    if (navigationType === "navigate" || navigationType === "reload") {
      setLoading(true);
      document.body.style.overflow = "hidden";

      const t = setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "auto";
      }, 2800);

      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <main>
        <Hero show={!loading} />
        {!loading && (
          <>
            <BrandMarquee />
            <AboutSection />
            <TalentShowcase />
            <WhyUs />
          </>
        )}
      </main>
    </>
  );
}
