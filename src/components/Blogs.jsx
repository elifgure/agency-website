"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X, Clock, Tag, User, ArrowRight } from 'lucide-react';

const Blogs = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Bloglar yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedBlog]);

  const heroArtists = articles.slice(0, 2).map(blog => ({
    name: blog.title.toUpperCase(),
    img: blog.image,
    desc: blog.content.substring(0, 150) + "..."
  }));

  const displayHeroArtists = heroArtists.length > 0 ? heroArtists : [
    { name: "YÜKLENİYOR...", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000", desc: "İçerikler hazırlanıyor..." }
  ];

  useEffect(() => {
    if (displayHeroArtists.length > 1) {
      const timer = setInterval(() => {
        setActiveHeroIndex(prev => (prev + 1) % displayHeroArtists.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [displayHeroArtists.length]);

  const calculateReadTime = (text) => {
    if (!text) return "0 DK";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute)) + " DK";
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-[#c95792] min-h-screen">
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row pt-[72px] items-start relative min-h-screen">
        
        {/* Sol Taraf - Sticky Hero Section */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] h-[60vh] overflow-hidden">
          <AnimatePresence>
            <motion.div 
              key={activeHeroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={displayHeroArtists[activeHeroIndex].img} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Artist" 
              />
              {/* Siyahlık/Gradyan tamamen kaldırıldı */}
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className="text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tighter text-center uppercase max-w-[80%] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
                >
                  {displayHeroArtists[activeHeroIndex].name}
                </motion.h2>
              </div>

              {/* Navigasyon Okları */}
              {displayHeroArtists.length > 1 && (
                <div className="absolute bottom-6 left-6 flex gap-3 z-30">
                  <button 
                    onClick={() => setActiveHeroIndex(prev => (prev === 0 ? displayHeroArtists.length - 1 : prev - 1))} 
                    className="p-3 border border-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-xl bg-black/30 text-white/70 hover:text-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => setActiveHeroIndex(prev => (prev + 1) % displayHeroArtists.length)} 
                    className="p-3 border border-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-xl bg-black/30 text-white/70 hover:text-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sağ Taraf - Scrollable Blog Listesi */}
        <div className="w-full lg:w-1/2 bg-[#0a0a0a] min-h-screen">
          <div className="p-8 md:p-20">
            <div className="space-y-24">
              {loading ? (
                <div className="py-20 text-center text-gray-500 font-bold tracking-widest uppercase italic">Yükleniyor...</div>
              ) : articles.length === 0 ? (
                <div className="py-20 text-center text-gray-500 font-bold tracking-widest uppercase italic">Henüz blog yazısı bulunmuyor.</div>
              ) : articles.map((article, index) => (
                <motion.article 
                  key={article._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedBlog(article)}
                  className="group relative cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-56 h-56 shrink-0 overflow-hidden rounded-3xl relative">
                      <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play fill="white" size={12} />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[10px] font-black text-[#7c4585] tracking-widest mb-4 uppercase">
                          <span>{article.category}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-gray-500">{calculateReadTime(article.content)}</span>
                        </div>
                        <h4 className="text-3xl font-bold group-hover:text-[#7c4585] transition-colors mb-4 tracking-tight">{article.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">{article.content}</p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors group/btn">
                           Tamamını Oku
                           <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Portal ile Body'ye taşındı */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-none font-sans">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-md pointer-events-auto"
                onClick={() => setSelectedBlog(null)}
              />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#0a0a0a] w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] border border-white/10 relative z-10 pointer-events-auto shadow-2xl scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-50 border border-white/10 group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col">
                  {/* Hero Image Section */}
                  <div className="w-full h-[40vh] md:h-[50vh] relative">
                    <img src={selectedBlog.image} className="w-full h-full object-cover" alt={selectedBlog.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-4 py-1.5 bg-[#7c4585] text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                          {selectedBlog.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold tracking-widest uppercase">
                          <Clock size={14} className="text-[#7c4585]" />
                          {calculateReadTime(selectedBlog.content)} OKUMA
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-5xl lg:text-3xl font-black tracking-tighter text-white leading-none">
                        {selectedBlog.title}
                      </h2>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-8 md:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                      <div className="lg:col-span-1 space-y-8">
                        <div className="flex flex-col gap-2">
                          <span className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase">Yazar</span>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#7c4585]/20 flex items-center justify-center text-[#7c4585]">
                              <User size={20} />
                            </div>
                            <span className="text-white font-bold text-sm">Talent Editorial</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-3">
                        <div className="text-gray-400 text-lg leading-relaxed space-y-6 font-medium">
                          {selectedBlog.content.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>

                        <div className="mt-16 pt-16 border-t border-white/5 flex flex-wrap gap-4">
                          <span className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl text-xs font-bold text-white/50 border border-white/5">
                            <Tag size={14} /> #DİJİTALSANAT
                          </span>
                          <span className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl text-xs font-bold text-white/50 border border-white/5">
                            <Tag size={14} /> #TRENDS2024
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Blogs;