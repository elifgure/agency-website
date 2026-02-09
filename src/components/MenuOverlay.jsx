"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import SocialIcons from "./SocialIcons";
import CursorGlow from "./CursorGlow";

const curtainVariants = {
  initial: {
    scaleX: 1,
    transformOrigin: "right",
  },
  open: {
    scaleX: 0,
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
  exit: {
    scaleX: 1,
    transformOrigin: "left",
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

export default function MenuOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
               {/* CURSOR GLOW */}
          <CursorGlow />
           {/* CURTAIN */}
          <motion.div
  className="absolute inset-0 z-40 bg-black"
  variants={curtainVariants}
  initial="initial"
  animate="open"
  exit="exit"
/>
          {/* MENU PANEL */}
          <motion.div
            initial={{ x: "100%", scaleX: 0.85 }}
            animate={{ x: 0, scaleX: 1 }}
            exit={{ x: "100%", scaleX: 0.85 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="
              relative
              w-[85vw] md:w-[70vw] max-w-4xl h-auto max-h-[80vh] md:h-[65vh]
              rounded-[2.5rem]
              bg-[#3D365C]/95
              border border-white/10
              flex flex-col md:flex-row
              overflow-y-auto scrollbar-hide
            "
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/80 hover:text-white text-2xl hover:rotate-90 transition z-50 focus:outline-none p-2"
            >
              <X size={28} />
            </button>

           {/* LEFT NAV */}
            <div className="flex flex-col justify-center items-center md:items-start gap-2 md:gap-6 px-8 md:px-12 pt-16 md:pt-0 pb-6 md:pb-0">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <Link key={item.label} href={item.href} onClick={onClose}>
                  <NavItem label={item.label} />
                </Link>
              ))}
            </div>

            {/* CENTER LOGO */}
            <div className="w-full md:w-1/3 flex items-center justify-center p-4 md:p-0">
              <Image
                src="/images/logo.svg"
                alt="Brand Logo"
                width={200}
                height={200}
                priority
                className="w-24 md:w-48 object-contain opacity-50 md:opacity-100"
              />
            </div>

            {/* RIGHT INFO */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-6 md:gap-16 pb-12 md:pb-0 px-8 md:px-12 text-white/70">
              <div className="text-center space-y-1 md:space-y-3">
                <p className="text-lg md:text-2xl font-bold text-white tracking-tight">Talent Studio</p>
                <div className="space-y-0.5 md:space-y-1">
                  <p className="text-xs md:text-lg font-medium">Istanbul, Turkey</p>
                  <p className="text-xs md:text-lg font-medium">+90 212 123 45 67</p>
                </div>
                <p className="text-[10px] md:text-lg uppercase text-[var(--color-accent)] font-black tracking-[0.2em] md:tracking-widest pt-2">hello@talentstudio.com</p>
              </div>

              <div className="scale-75 md:scale-100">
                <SocialIcons />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
