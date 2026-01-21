"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div
            className="
              flex items-center justify-between
              rounded-full
              bg-black/40 backdrop-blur-xl
              border border-white/10
              px-6 py-3
            "
          >
            {/* LOGO */}
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                priority
              />
            </div>

            {/* CENTER MENU (DESKTOP) */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full p-1">
              {["Home", "About", "Blog", "News"].map((item) => (
                <button
                  key={item}
                  className="
                    px-5 py-2 rounded-full
                    text-sm text-white/80
                    hover:text-white
                    hover:bg-white/10
                    transition
                    cursor-pointer
                  "
                >
                  {item}
                </button>
              ))}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                className="
                  group hidden sm:flex items-center gap-2
                  px-5 py-2 rounded-full
                  bg-[var(--color-accent)]
                  text-white text-sm font-medium
                  hover:opacity-90 transition
                "
              >
                Contact Us
                <ArrowUpRight
                  className="
                    w-4 h-4
                    transition-transform duration-300 ease-out
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* MENU ICON */}
              <Menu
                onClick={() => setMenuOpen(true)}
                className="
                  text-white/80 hover:text-white
                  cursor-pointer transition
                  hover:scale-110
                "
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* OVERLAY MENU */}
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
