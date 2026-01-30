"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const items = [
  { 
    id: "01",
    cat: "ODAK", 
    mid: "TALENT",
    end: "PREMIUM DENEYİM",
    img: "/images/hero/hero-1.jpg",
    num: "I" 
  },
  { 
    id: "02",
    cat: "EVENT", 
    mid: "LIVE",
    end: "STORY",
    img: "/images/hero/hero-2.jpg",
    num: "II" 
  },
  { 
    id: "03",
    cat: "PROJECT", 
    mid: "CREATIVE",
    end: "STORY",
    img: "/images/hero/hero-3.jpg",
    num: "III" 
  },
  { 
    id: "04",
    cat: "COLLAB", 
    mid: "BRAND",
    end: "STORY",
    img: "/images/hero/hero-4.jpg",
    num: "IV" 
  },
  { 
    id: "05",
    cat: "DIGITAL", 
    mid: "TECH",
    end: "STORY",
    img: "/images/hero/hero-1.jpg", 
    num: "V" 
  },
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col md:flex-row"
    >
      {/* VERTICAL SIDEBAR - Hidden on Mobile */}
      <div className="hidden md:flex relative w-12 h-full border-r border-white/10 flex-col items-center justify-between py-10 z-50 bg-black">
        <div className="flex-1 flex items-center justify-center">
          <h2 
            className="uppercase tracking-[0.6em] font-medium text-[9px] whitespace-nowrap opacity-60"
            style={{ transform: "rotate(-90deg)" }}
          >
            ESSENTIALITY OF TALENT
          </h2>
        </div>
      </div>

      {/* ACCORDION CARDS */}
      <div className="flex flex-col md:flex-row flex-1 h-full">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
            className="relative flex-1 md:h-full border-b md:border-b-0 md:border-r border-white/10 overflow-hidden cursor-pointer"
            animate={{
              flex: hoveredIndex === i ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 3) : 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* BACKGROUND IMAGE */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={item.img}
                alt={item.cat}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* DARK CARD CONTENT */}
            <div 
              className={`absolute inset-0 z-10 bg-black flex flex-col items-center justify-center p-4 md:p-6 text-center transition-all duration-700 ${hoveredIndex === i ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="flex flex-col gap-1 md:gap-2 uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
                <span className="text-[8px] md:text-[10px] leading-none">{item.cat}</span>
                <span className="text-[7px] md:text-[9px] italic lowercase leading-none opacity-40">is a</span>
                <span className={`font-bold italic tracking-[0.05em] ${i === 0 ? 'text-[14px] md:text-[18px] text-white/95' : 'text-[12px] md:text-[14px] text-white/80'}`}>
                   {item.mid}
                </span>
                <span className="text-[8px] md:text-[10px] leading-none">{item.end}</span>
              </div>
            </div>

            {/* HOVER TITLE */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <div className="flex flex-col items-center gap-3 md:gap-6">
                  <h3 className="text-2xl md:text-5xl font-bold tracking-tighter italic uppercase text-white/90">
                     {item.mid}
                  </h3>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 hover:bg-white hover:text-black transition-all">
                    <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em]">READ</span>
                    <span className="text-lg leading-none">∞</span>
                  </button>
               </div>
            </div>

            {/* BOTTOM NUMERAL */}
            <div className="absolute bottom-6 md:bottom-16 left-0 w-full flex justify-center z-30 pointer-events-none">
               <span 
                 className={`text-[60px] md:text-[120px] font-serif italic text-white/5 transition-all duration-1000 transform leading-none ${hoveredIndex === i ? 'translate-y-0 opacity-40' : 'translate-y-6 md:translate-y-12 opacity-10'}`}
                 style={{ letterSpacing: "-0.2em" }}
               >
                 {item.num}
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
