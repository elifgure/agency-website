"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";

export default function Preloader() {
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {

    const controls = animate(progress, 100, {
      duration: 2.8,
      ease: "easeInOut",
    });

    return () => {
      controls.stop();
    };
  }, []);

  /* birleşme & brand reveal */
  const saturation = useTransform(progress, [0, 100], [0.6, 1]);
  const glowStrength = useTransform(progress, [0, 100], [0.25, 0.6]);
  const brandMerge = useTransform(progress, [85, 100], [0, 1]);

  const frames = Array.from({ length: 10 }).map((_, i) => ({
    scale: 1.8 + i * 0.25,
    rotateZ: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
    rotateX: -10 + i * 1.5,
    z: -i * 180,
    opacity: 0.7 - i * 0.04,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[var(--color-dark)] overflow-hidden"
      style={{ perspective: 1800 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[420px] h-[260px]">
          {/* OUTER FRAMES */}
          {frames.map((f, i) => {
            const scale = useTransform(
              progress,
              [0, 85, 100],
              [f.scale, 1.05, 1]
            );
            const rotateZ = useTransform(progress, [0, 100], [f.rotateZ, 0]);
            const rotateX = useTransform(progress, [0, 100], [f.rotateX, 0]);
            const z = useTransform(progress, [0, 100], [f.z, 0]);

            return (
              <motion.div
                key={i}
                className="absolute inset-0 border"
                style={{
                  scale,
                  rotateZ,
                  rotateX,
                  translateZ: z,
                  opacity: f.opacity,
                  borderColor: "rgba(201,87,146,0.45)",
                  filter: `saturate(${saturation.get()})`,
                  boxShadow: `
                    0 0 ${14 + glowStrength.get() * 30}px rgba(201,87,146,${glowStrength.get()}),
                    inset 0 0 ${8 + glowStrength.get() * 20}px rgba(201,87,146,0.2)
                  `,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  boxShadow: [
                    "0 0 14px rgba(201,87,146,0.35)",
                    "0 0 26px rgba(201,87,146,0.6)",
                    "0 0 14px rgba(201,87,146,0.35)",
                  ],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* CENTER FRAME — BRAND REVEAL */}
          <motion.div
            className="absolute inset-0 border-2"
            style={{
              borderColor: brandMerge.get() > 0.5 ? "#c95792" : "#7c4585",
              boxShadow:
                "0 0 26px rgba(201,87,146,0.55), inset 0 0 12px rgba(201,87,146,0.35)",
            }}
          />

          {/* COUNTER (SABİT) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-6xl font-light tracking-widest"
            style={{
              color: "#c95792",
              textShadow:
                "0 0 20px rgba(201,87,146,0.65), 0 0 36px rgba(201,87,146,0.4)",
            }}
          >
            {rounded}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
