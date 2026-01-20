"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import NavItem from "./NavItem";
import SocialIcons from "./SocialIcons";

export default function MenuOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MENU PANEL */}
          <motion.div
            initial={{ x: "100%", scaleX: 0.85 }}
            animate={{ x: 0, scaleX: 1 }}
            exit={{ x: "100%", scaleX: 0.85 }}
            transition={{
              duration: 0.8,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="
              relative
              w-[80vw] max-w-5xl h-[70vh]
              rounded-3xl
              bg-[#3D365C]/90
              border border-white/10
              flex
            "
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white text-2xl hover:rotate-90 transition"
            >
              <X />
            </button>

           {/* LEFT NAV */}
<div className="group flex flex-col justify-center gap-6 pl-12">
  {["Home", "About", "Projects", "Contact"].map((item) => (
    <NavItem key={item} label={item} onClick={onClose} />
  ))}
</div>

            {/* CENTER LOGO */}
<div className="w-1/3 flex items-center justify-center">
  <Image
    src="/image/logo.svg"
    alt="Brand Logo"
    width={120}
    height={120}
    priority
    className="object-contain"
  />
</div>

            {/* RIGHT INFO */}
            <div className="w-1/3 flex flex-col justify-between py-12 pr-12 text-white/70">
              <div>
                <p className="text-sm">Studio Name</p>
                <p className="text-sm">Berlin, Germany</p>
                <p className="text-sm">hello@studio.com</p>
              </div>

              <SocialIcons />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
