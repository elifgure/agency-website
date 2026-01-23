"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-black text-white pt-16 md:pt-32 pb-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT – IDENTIFIER */}
        <div className="lg:col-span-5 flex items-center gap-3 pt-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-primary)] opacity-80">
            WHO ARE WE
          </span>
        </div>

        {/* RIGHT – CONTENT */}
        <div className="lg:col-span-7 space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-3xl lg:text-4xl font-medium leading-[1.2] tracking-tight"
          >
            <span className="opacity-40">— </span>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eveniet aperiam explicabo vel modi dolore!          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            {/* PURPLE BUTTON */}
            <button className="group relative flex items-center gap-4 bg-[var(--color-primary)] hover:bg-white text-white hover:text-black px-4 py-2 rounded-full transition-all duration-500 overflow-hidden border border-[var(--color-primary)]">
              <span className="text-[10px] font-bold tracking-widest uppercase relative z-10">
                More about us
              </span>
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center -mr-2 transition-all duration-500 group-hover:bg-black group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
