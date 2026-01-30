import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-gradient-to-b
        from-black via-[var(--color-dark)] to-black
        text-white
        overflow-hidden
      "
    >
      {/* SOFT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[var(--color-primary)]/20 blur-[160px]" />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative z-10
          max-w-6xl mx-auto
          px-6 pt-8 pb-16
          grid grid-cols-1 md:grid-cols-3
          items-center
          gap-12
        "
      >
       {/* LEFT – LOGO */}
<div className="flex flex-col items-center md:items-start gap-3">
  <Image
    src="/images/logo.svg"
    alt="Logo"
    width={140}
    height={140}
    className="object-contain"
  />

  <p className="text-white/60 text-sm max-w-xs leading-relaxed">
    Premium talent-focused live streaming & brand collaboration studio.
  </p>
</div>

        {/* CENTER – ADDRESS */}
        <div className="text-center text-white/70 text-lg space-y-1">
          <p className="font-medium text-white">Studio Name</p>
          <p>Berlin, Germany</p>
          <p className="text-lg underline">+49 123 456 7890</p>
          <p>hello@studio.com</p>
        </div>

        {/* RIGHT – SOCIAL */}
        <div className="flex justify-center md:justify-end">
          <SocialIcons />
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/5 md:py-6 py-3 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Studio Name. All rights reserved.
      </div>
    </footer>
  );
}
