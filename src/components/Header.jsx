"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "PROJECTS", href: "/projects" },
    { name: "ABOUT", href: "/about" },
    { name: "BLOG", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 w-full z-[60] bg-black/20 backdrop-blur-md border-b border-white/5"
      >
        <div className="w-full px-6 md:px-12 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* LOGO AREA */}
            <div className="flex items-center gap-4 md:gap-8">
              <a href="/" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

            {/* CENTER MENU */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      text-[10px] font-bold tracking-[0.4em] transition-all duration-300
                      ${isActive ? 'text-[var(--color-primary)]' : 'text-white/40 hover:text-[var(--color-primary)]'}
                      cursor-pointer
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4 md:gap-8">
              <button
                className="
                  group hidden sm:flex items-center gap-3
                  px-4 md:px-6 py-1.5 md:py-2 rounded-full
                  bg-[var(--color-primary)]
                  border border-[var(--color-primary)]
                  text-white text-[9px] md:text-[10px] font-bold tracking-[0.3em]
                  hover:bg-white hover:border-white hover:text-black transition-all duration-500
                "
              >
                CONTACT
                <ArrowUpRight
                  className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:text-black transition-opacity"
                />
              </button>

              {/* MENU ICON */}
              <div 
                onClick={() => setMenuOpen(true)}
                className="group cursor-pointer flex flex-col gap-1 md:gap-1.5 items-end"
              >
                <div className="w-5 md:w-6 h-[1px] bg-[var(--color-primary)] group-hover:w-8 transition-all duration-300" />
                <div className="w-3 md:w-4 h-[1px] bg-[var(--color-primary)] group-hover:w-8 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
