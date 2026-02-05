"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, X } from 'lucide-react';

const ProjectsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Projeler yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const timer = setInterval(() => setCarouselIndex((prev) => (prev + 1) % projects.length), 5000);
      return () => clearInterval(timer);
    }
  }, [projects.length]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#7c4585] font-black tracking-[0.5em] uppercase">Yükleniyor...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#7c4585]">
      
      {/* 1. TOP CAROUSEL - Updated with Purple Border */}
      {projects.length > 0 && (
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
      )}

      {/* 2. SECTION HEADER & GRID */}
      <section className="px-4 py-20 max-w-[1600px] mx-auto">
        <div className="mb-12 px-2">
            <h3 className="text-xs font-black tracking-[0.5em] text-[#7c4585] uppercase mb-2">Portfolio</h3>
            <h4 className="text-3xl font-bold tracking-tighter">ALL PROJECTS</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="relative h-[65vh] md:h-[75vh] overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]">
              <AnimatePresence initial={false} mode="wait">
                {expandedId !== project._id ? (
                  <motion.div
                    key="front"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    onClick={() => {
                      setExpandedId(project._id);
                      setIsPlaying(false);
                    }}
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
                    {/* Left Side: Video (Fit 10/16, No Scroll) */}
                    <div className="flex-1 h-full flex items-center justify-center overflow-hidden py-4">
                      {project.video ? (
                        <div className="h-full aspect-[10.5/16] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative shadow-purple-600/10 group/video">
                          <video 
                            src={project.video} 
                            controls 
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture
                            className="w-full h-full object-cover"
                            poster={project.cover}
                          />
                          {!isPlaying && (
                            <div 
                              className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-opacity duration-300"
                            >
                              <div className="w-24 h-24 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-purple-600/40 border border-white/20">
                                <Play fill="white" size={40} className="text-white ml-2" />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full aspect-[10.5/16] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                          <img src={project.cover} className="w-full h-full object-cover" alt={project.brand} />
                        </div>
                      )}
                    </div>

                    {/* Right Side: Info & Reels (Scrollable) */}
                    <div className="w-full md:w-2/5 flex flex-col h-full overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                      <div className="flex justify-between items-start mt-8 mb-8 shrink-0">
                        <h2 className="text-4xl font-black tracking-tight italic uppercase">{project.brand}</h2>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setExpandedId(null);
                            setIsPlaying(false);
                          }} 
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-90 border border-white/10"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black tracking-[0.5em] text-[#7c4585] uppercase mb-3 px-1 border-l-2 border-[#7c4585] ml-1">About Project</p>
                          <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            {project.desc}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-8">
                          <div>
                            <p className="text-[9px] font-bold text-[#7c4585] uppercase tracking-[0.3em] mb-1">Client</p>
                            <p className="text-sm font-black italic">{project.client || project.brand}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-[#7c4585] uppercase tracking-[0.3em] mb-1">Year</p>
                            <p className="text-sm font-black italic">{project.year}</p>
                          </div>
                        </div>

                        {/* Reels Gallery Moved Here */}
                        {project.reels?.length > 0 && (
                          <div className="pb-8">
                            <p className="text-[10px] font-black tracking-[0.5em] text-[#7c4585] uppercase mb-6 px-1 border-l-2 border-[#7c4585] ml-1">Project Reels</p>
                            <div className="grid grid-cols-2 gap-4">
                              {(project.reels || []).map((reel, idx) => (
                                <div key={idx} className="aspect-[9/16] bg-dark rounded-xl overflow-hidden relative group/reel border border-white/5 shadow-lg">
                                  {reel.match(/\.(mp4|webm|ogg)$/) ? (
                                    <video 
                                      src={reel} 
                                      autoPlay 
                                      muted 
                                      loop 
                                      playsInline 
                                      className="w-full h-full object-cover opacity-80 group-hover/reel:opacity-100 transition-all duration-500"
                                    />
                                  ) : (
                                    <img src={reel} className="w-full h-full object-cover opacity-80 group-hover/reel:opacity-100 transition-all duration-500" alt="" />
                                  )}
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover/reel:bg-transparent transition-all">
                                    <Play fill="white" size={20} className="text-white opacity-40 group-hover/reel:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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