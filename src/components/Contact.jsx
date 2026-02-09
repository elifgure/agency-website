"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#7c4585] flex flex-col lg:flex-row pt-[72px] items-start relative">
      
      {/* SOL TARAF - GÖRSEL VE SLOGAN */}
      <section className="w-full lg:w-1/2 lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] h-[60vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Contact Model"
        />
        <div className="absolute inset-0 bg-[#7c4585]/20 mix-blend-multiply" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter italic">
              LET'S MAKE<br />
              <span className="text-[#7c4585] not-italic">MAGIC.</span>
            </h1>
            <p className="mt-8 text-gray-300 max-w-sm text-sm md:text-base font-medium tracking-wide leading-relaxed">
              Vizyonunuzu gerçeğe dönüştürmek için doğru yerdesiniz. Kreatif yolculuğumuz burada başlıyor.
            </p>
          </motion.div>
        </div>

        {/* Alt Bilgi - Sol */}
        <div className="absolute bottom-12 left-12 hidden md:block">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">EST. 2024 / ISTANBUL</p>
        </div>
      </section>

      {/* SAĞ TARAF - FORM VE İLETİŞİM BİLGİLERİ */}
      <section className="w-full lg:w-1/2 bg-[#0a0a0a] flex flex-col justify-between pt-6 md:pt-20 px-8 md:px-24 pb-8 md:pb-24">
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xs font-black tracking-[0.5em] text-[#7c4585] uppercase mb-10">Get In Touch</h2>
            
            <form className="space-y-12">
              <div className="group relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 group-focus-within:text-[#7c4585] transition-colors">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#7c4585] transition-all font-bold text-xl" placeholder="Adınız Soyadınız" />
              </div>

              <div className="group relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 group-focus-within:text-[#7c4585] transition-colors">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#7c4585] transition-all font-bold text-xl" placeholder="E-posta adresiniz" />
              </div>

              <div className="group relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 group-focus-within:text-[#7c4585] transition-colors">Message</label>
                <textarea rows="3" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#7c4585] transition-all font-bold text-xl resize-none" placeholder="Projenizden bahsedin..." />
              </div>

              <button className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-[#7c4585] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#7c4585]">
                  <ArrowUpRight size={28} />
                </div>
                <span className="text-xl font-black italic tracking-tighter group-hover:text-[#7c4585] transition-colors">SEND MESSAGE</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;