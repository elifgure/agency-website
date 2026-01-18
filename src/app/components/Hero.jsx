"use client";

import { motion } from "framer-motion";

export default function Hero({ show }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Talent odaklı premium deneyim
        </h1>
        <p className="mt-6 text-lg max-w-xl mx-auto">
          Canlı yayın ve creator dünyası için modern iş birlikleri
        </p>
      </div>
    </motion.section>
  );
}
