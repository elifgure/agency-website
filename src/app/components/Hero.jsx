"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { title: "Etkinlik", img: "/images/hero/hero-1.jpg" },
  { title: "Canlı Yayın", img: "/images/hero/hero-2.jpg" },
  { title: "Projeler", img: "/images/hero/hero-3.jpg" },
  { title: "Collab", img: "/images/hero/hero-4.jpg" },
];

export default function Hero({ show }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="
        relative w-full min-h-screen
        bg-gradient-to-b
        from-black via-black to-[var(--color-dark)]
        text-white
        flex flex-col
        pb-32
      "
    >
      {/* SOFT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--color-primary)]/25 blur-[160px]" />
        <div className="absolute top-2/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/25 blur-[180px]" />
      </div>

      {/* HEADLINE */}
      <div className="relative z-10 text-center px-6 pt-32 mb-24">
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

      {/* IMAGE CARDS */}
      <div className="relative z-10 w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="
                group relative
                h-[520px]
                rounded-3xl
                overflow-hidden
                cursor-pointer
              "
            >
              {/* IMAGE */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                priority={i === 0}
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />

              {/* DARK CURTAIN */}
              <motion.div
                className="
                  absolute inset-0
                  bg-black/90
                  flex items-center justify-center
                  text-3xl font-semibold tracking-wide
                  backdrop-blur-md
                "
                initial={{ x: 0 }}
                whileHover={{ x: "-100%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                {item.title}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
