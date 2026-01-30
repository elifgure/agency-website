"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Filter, Mail, ArrowRight, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const Blogs = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroArtists = [
    { name: "MILA VANCE", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000", desc: "Dijital portre dünyasının sınırlarını zorlayan Mila, yeni serisi 'Aura'nın perde arkasını anlatıyor." },
    { name: "JULIAN GREY", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000", desc: "Işık ve gölge ustası Julian, sinematik derinliğin sırlarını paylaşıyor." }
  ];

  const articles = [
    { id: 1, tag: "DİJİTAL EKSPRESYON", time: "5 DK", title: "Dijital Ekspresyonun Geleceği", excerpt: "Yapay zeka ve sanatsal düşünce yapımızı keşfediyoruz...", image: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?auto=format&fit=crop&q=80&w=600", likes: 124 },
    { id: 2, tag: "LENSİN ARKASINDA", time: "12 DK", title: "Cinematic Masterclass", excerpt: "Sektörün öncü görüntü yönetmeni ile ışığın gücü üzerine.", image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=600", likes: 89 },
    { id: 3, tag: "MODA VE TREND", time: "8 DK", title: "2024 Cast Seçmeleri", excerpt: "Ajansların bu yıl aradığı o aura nedir?", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600", likes: 256 },
    { id: 4, tag: "TEKNOLOJİ VE SANAT", time: "6 DK", title: "Sanal Gerçeklik ve Oyunculuk", excerpt: "VR dünyasında performans sanatının evrimi ve oyuncular için yeni fırsatlar.", image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=600", likes: 178 },
    { id: 5, tag: "KARİYER", time: "10 DK", title: "Global Ajanslarla Çalışmak", excerpt: "Yurtdışına açılmak isteyen yetenekler için kapsamlı rehber.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600", likes: 215 },
    { id: 6, tag: "BACKSTAGE", time: "7 DK", title: "Set Arkası Sırları", excerpt: "Büyük prodüksiyonların görünmeyen kahramanları ve set adabı.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600", likes: 142 },
    { id: 7, tag: "PORTFOLYO", time: "9 DK", title: "Etkileyici Showreel Hazırlama", excerpt: "Kasting direktörlerinin dikkatini çekecek showreel ipuçları.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600", likes: 198 },
    { id: 8, tag: "SAĞLIK", time: "5 DK", title: "Oyuncular İçin Ses Koruma", excerpt: "Ses tellerinizi korumak ve geliştirmek için günlük egzersizler.", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=600", likes: 167 }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#c95792] pt-24">
      {/* Blog Header - Restored */}
      <div className="flex items-center justify-between px-8 py-6 bg-black/40 backdrop-blur-md mb-4">
        <div className="flex items-center gap-2 font-black italic text-2xl tracking-tighter cursor-pointer">
          <div className="w-6 h-4 bg-[#7c4585] rounded-full flex items-center justify-center">★</div>
            BLOGS
        </div>
        
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sol Taraf - Dinamik Hero */}
        <section className="w-full lg:w-1/2 h-[70vh] lg:h-[calc(100vh-84px)] lg:sticky lg:top-[70px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeHeroIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="relative h-full w-full"
            >
              <img src={heroArtists[activeHeroIndex].img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Artist" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <motion.h2 initial={{ y: 20 }} animate={{ y: 0 }} className="text-8xl font-black leading-none tracking-tighter mb-4">
                  {heroArtists[activeHeroIndex].name.split(' ')[0]}<br/>{heroArtists[activeHeroIndex].name.split(' ')[1]}
                </motion.h2>
                <p className="text-gray-400 text-sm max-w-sm mb-6">{heroArtists[activeHeroIndex].desc}</p>
                <div className="flex gap-4">
                  <button onClick={() => setActiveHeroIndex(prev => (prev === 0 ? 1 : 0))} className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => setActiveHeroIndex(prev => (prev === 1 ? 0 : 1))} className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Sağ Taraf - Yazı Listesi */}
        <section className="w-full lg:w-1/2 bg-[#0a0a0a] p-8 md:p-20">
          <div className="space-y-24">
            {articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-56 h-56 shrink-0 overflow-hidden rounded-3xl relative">
                    <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play fill="white" size={12} />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] font-black text-[#7c4585] tracking-widest mb-4">
                        <span>{article.tag}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-gray-500">{article.time}</span>
                      </div>
                      <h4 className="text-3xl font-bold group-hover:text-[#7c4585] transition-colors mb-4 tracking-tight">{article.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">{article.excerpt}</p>
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
        </section>
      </div>
    </div>
  );
};

export default Blogs;