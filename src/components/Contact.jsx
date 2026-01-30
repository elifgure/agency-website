"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#7c4585] flex flex-col lg:flex-row">
      
      {/* SOL TARAF - GÖRSEL VE SLOGAN */}
      <section className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-hidden">
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
      <section className="w-full lg:w-1/2 bg-[#0a0a0a] flex flex-col justify-between p-8 md:p-24">
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xs font-black tracking-[0.5em] text-[#7c4585] uppercase mb-16">Get In Touch</h2>
            
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

        {/* ALT BİLGİLER - SAĞ */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 tracking-widest">ADDRESS</p>
            <p className="text-sm font-black leading-relaxed">
              Levent Loft No:12<br />
              Beşiktaş / Istanbul, TR
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 tracking-widest">SOCIALS</p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="hover:text-[#7c4585] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#7c4585] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#7c4585] transition-colors">Linkedin</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;