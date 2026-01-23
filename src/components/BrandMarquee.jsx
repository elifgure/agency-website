"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import brands from "@/data/brands";

export default function BrandMarquee() {
  return (
    <section className="relative w-full overflow-hidden pb-8 md:pb-20 pt-8 -mt-4 md:-mt-8">
      {/* fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex gap-2 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
      >
        {[...brands, ...brands, ...brands].map((brand, i) => {
          // Bir dizi farklı rotasyon değeri tanımlayalım (görseldeki dalgalı duruş için)
          const rotations = [2, -1, 3, -2, 1, -3];
          const rotation = rotations[i % rotations.length];

          return (
            <div
              key={i}
              style={{ transform: `rotate(${rotation}deg)` }}
              className="
                group
                relative
                w-36 h-36 md:w-44 md:h-44
                rounded-[2.5rem]
                bg-transparent
                border-2 border-[var(--color-primary)]/30
                flex items-center justify-center
                shrink-0
                transition-all duration-500
                hover:rotate-0 hover:scale-105 hover:z-20 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5
                shadow-[0_0_20px_var(--color-primary)]/10 hover:shadow-[0_0_30px_var(--color-primary)]/20
              "
            >
              <div 
                className="relative w-2/3 h-2/3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{ mixBlendMode: "screen" }}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={140}
                  height={140}
                  className="object-contain invert opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
