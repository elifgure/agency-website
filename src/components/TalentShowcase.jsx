"use client";

import Image from "next/image";

export default function TalentShowcase() {
  return (
    <section className="relative w-full pt-4 pb-28 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* MOBILE ONLY TITLE */}
        <div className="md:hidden mb-16 px-2">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-[var(--color-primary)] opacity-90 italic">
            Talents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32">
          {/* SOL KOLON */}
          <div className="flex flex-col gap-32">
            {/* Görsel 1 */}
            <div className="relative group">
              <Image
                src="/images/talents/talent1.jpg"
                alt="Mieko – Dersar Hairdryer"
                width={520}
                height={700}
                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(124,69,133,0.2)] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute left-0 -bottom-4 translate-y-full text-white">
                <p className="text-sm text-[var(--color-primary)]">2024 · Mieko</p>
                <p className="text-lg font-medium">Dersar Hairdryer</p>
              </div>
            </div>

            {/* Görsel 3 */}
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(124,69,133,0.2)] transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/images/talents/talent-3.jpg"
                  alt="Mieko – Campaign"
                  width={520}
                  height={700}
                  className="object-cover"
                />
              </div>
              <div className="absolute left-0 right-0 -bottom-4 translate-y-full text-white">
                <p className="text-sm text-[var(--color-primary)]">2024 · Mieko</p>
                <p className="text-lg font-medium">Dersar Hairdryer</p>
              </div>
            </div>
          </div>

          {/* SAĞ KOLON */}
          <div className="flex flex-col gap-32 md:pl-24">
            {/* LARGE TITLE IN GAP (Desktop Only) */}
            <div className="hidden md:flex md:h-40 items-end pb-8">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-[var(--color-primary)] opacity-90 italic">
                Talents
              </h2>
            </div>

            {/* Görsel 2 */}
            <div className="relative group">
              <Image
                src="/images/talents/talent2.jpg"
                alt="Mieko – Studio"
                width={520}
                height={700}
                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(124,69,133,0.2)] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute left-0 -bottom-4 translate-y-full text-white">
                <p className="text-sm text-[var(--color-primary)]">2024 · Mieko</p>
                <p className="text-lg font-medium">Dersar Hairdryer</p>
              </div>
            </div>

            {/* Görsel 4 */}
            <div className="relative group">
              <Image
                src="/images/talents/talent4.jpg"
                alt="Mieko – Editorial"
                width={520}
                height={700}
                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(124,69,133,0.2)] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute left-0 -bottom-4 translate-y-full text-white">
                <p className="text-sm text-[var(--color-primary)]">2024 · Mieko</p>
                <p className="text-lg font-medium">Dersar Hairdryer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
