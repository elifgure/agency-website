"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const reasons = [
  {
    id: "01",
    title: "Currated Excellence",
    description: "We don't just represent talent; we cultivate it. Every artist and creator in our roster is handpicked for their unique vision and potential to redefine their industry."
  },
  {
    id: "02",
    title: "Strategic Partnership",
    description: "Think of us as your secondary brain. We handle the complexities of business, negotiation, and growth so you can focus entirely on your craft."
  },
  {
    id: "03",
    title: "Global Reach",
    description: "With roots in Berlin and a network that spans from LA to Tokyo, we provide the infrastructure needed to turn local success into a global phenomenon."
  }
];

export default function WhyUs() {
  return (
    <section className="relative w-full pt-16 md:pt-32 pb-8 md:pb-16 bg-black overflow-hidden">
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* TWO VISIBLE PURPLE CIRCLES */}
        <div className="absolute top-20 -left-20 w-[300px] h-[300px] bg-[var(--color-primary)]/20 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute top-[300px] -left-10 w-[250px] h-[250px] bg-[var(--color-primary)]/15 blur-[60px] rounded-full animate-bounce [animation-duration:10s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
          
          {/* LEFT - STICKY TITLE */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-[0.4em] uppercase text-[var(--color-primary)] mb-6 italic">
                Why Us?
              </h2>
              <p className="mt-8 text-white/40 text-lg max-w-sm leading-relaxed">
                We bridge the gap between pure talent and commercial success through a boutique, high-touch approach.
              </p>
            </motion.div>
          </div>

          {/* RIGHT - REASONS LIST */}
          <div className="lg:col-span-7 space-y-1">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-b border-white/10 py-12 cursor-default"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex gap-8 group-hover:gap-12 transition-all duration-500">
                    <span className="text-xs font-mono text-[var(--color-primary)] opacity-60 pt-2">
                      {reason.id}
                    </span>
                    <div className="space-y-4">
                      <h4 className="text-3xl md:text-4xl font-medium text-white transition-colors duration-500 group-hover:text-[var(--color-primary)] uppercase tracking-tight">
                        {reason.title}
                      </h4>
                      <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500 max-w-lg leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-primary)] flex items-center justify-center">
                       <ArrowUpRight className="text-[var(--color-primary)] w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
