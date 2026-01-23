"use client";
import { motion } from "framer-motion";

export default function NavItem({ label, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        relative
        text-5xl font-semibold text-white
        cursor-pointer
        transition-all duration-300 ease-out

        blur-0 opacity-100

        group-hover:[&:not(:hover)]:blur-[3px]
        group-hover:[&:not(:hover)]:opacity-20

        hover:scale-125
      "
    >
      {label}
    </motion.div>
  );
}
