"use client";

import { motion } from "framer-motion";

export default function Hero({ show }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="
        relative min-h-screen
        flex items-center justify-center
        bg-gradient-to-b
        from-black via-black to-[var(--color-dark)]
        text-white
        overflow-hidden
      "
    >
      {/* SOFT GLOW BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/20 blur-[140px]" />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/20 blur-[160px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Talent odaklı <br />
          <span className="text-[var(--color-accent)]">
            premium deneyim
          </span>
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
          Canlı yayın ve creator dünyası için modern,
          ölçülebilir ve yaratıcı iş birlikleri
        </p>
      </div>
    </motion.section>
  );
}
