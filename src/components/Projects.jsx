"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, X } from 'lucide-react';

const ProjectsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const projects = [
    { id: 1, brand: "NIKE", category: "Global Campaign", year: "2024", cover: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200", reels: ["https://images.unsplash.com/photo-1541233349642-6e425fe6190e?q=80&w=600", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"], desc: "Hız ve estetiğin buluştuğu bu global kampanyada, yeteneklerimizin limitleri zorlayan enerjisini yakaladık." },
    { id: 2, brand: "PRADA", category: "Haute Couture", year: "2024", cover: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200", reels: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600", "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=600"], desc: "Minimalist lüksü dijital ortama taşıdığımız Prada projesinde, dikey video formatıyla haute couture deneyimi sunduk." },
    { id: 3, brand: "VOGUE", category: "Editorial", year: "2023", cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200", reels: ["https://images.unsplash.com/photo-1558507652-2d9626c4e67a?q=80&w=600", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600"], desc: "Modanın kalbinde, yeni nesil cast seçimi ve görsel yönetimle Vogue için ikonik bir seri yarattık." },
    { id: 4, brand: "ADIDAS", category: "Lifestyle", year: "2024", cover: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1200", reels: ["https://images.unsplash.com/photo-1541233349642-6e425fe6190e?q=80&w=600"], desc: "Sokak kültürünü ve performansı bir araya getiren Adidas lansmanımız." }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCarouselIndex((prev) => (prev + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#7c4585]">
      
      {/* 1. TOP CAROUSEL - Updated with Purple Border */}
      <section className="relative h-[80vh] w-full overflow-hidden pt-24 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-[#7c4585]/40 shadow-[0_0_30px_rgba(124,69,133,0.15)]"
          >
            <img src={projects[carouselIndex].cover} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
              <h2 className="text-8xl md:text-[10vw] font-black tracking-tighter leading-none italic">{projects[carouselIndex].brand}</h2>
              <p className="text-[#7c4585] font-bold tracking-[0.3em] mt-4 text-sm uppercase">{projects[carouselIndex].category}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 2. SECTION HEADER & GRID */}
      <section className="px-4 py-20 max-w-[1600px] mx-auto">
        <div className="mb-12 px-2">
            <h3 className="text-xs font-black tracking-[0.5em] text-[#7c4585] uppercase mb-2">Portfolio</h3>
            <h4 className="text-3xl font-bold tracking-tighter">ALL PROJECTS</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="relative h-[65vh] md:h-[75vh] overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]">
              <AnimatePresence initial={false} mode="wait">
                {expandedId !== project.id ? (
                  <motion.div
                    key="front"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    onClick={() => setExpandedId(project.id)}
                    className="absolute inset-0 cursor-pointer group"
                  >
                    <img src={project.cover} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="w-16 h-16 rounded-full bg-[#7c4585] flex items-center justify-center shadow-2xl shadow-purple-600/40">
                          <Plus size={32} />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase">Detayları Görüntüle</span>
                      </div>
                    </div>

                    <div className="absolute bottom-10 left-10">
                      <h4 className="text-5xl font-black tracking-tighter italic">{project.brand}</h4>
                      <p className="text-gray-400 text-xs font-bold tracking-widest mt-2">{project.year} / {project.category}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute inset-0 p-8 flex flex-col md:flex-row gap-8 bg-black/95"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar h-full">
                      {project.reels.map((reel, idx) => (
                        <div key={idx} className="aspect-[9/16] bg-dark rounded-lg overflow-hidden relative group/reel">
                          <img src={reel} className="w-full h-full object-cover opacity-70 group-hover/reel:opacity-100 transition-all" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play fill="white" size={20} className="text-white opacity-0 group-hover/reel:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col">
                      <div className="flex justify-between items-start mb-10">
                        <h5 className="text-3xl font-black tracking-tight">{project.brand}</h5>
                        <button onClick={(e) => { e.stopPropagation(); setExpandedId(null); }} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                        {project.desc}
                      </p>
                      <div className="space-y-4 border-t border-white/10 pt-8">
                        <div>
                          <p className="text-[9px] font-bold text-[#7c4585] uppercase tracking-widest">Client</p>
                          <p className="text-sm font-bold">{project.brand} Global</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-[#7c4585] uppercase tracking-widest">Year</p>
                          <p className="text-sm font-bold italic">{project.year}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;