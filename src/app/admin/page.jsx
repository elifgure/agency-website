"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, X, Image as ImageIcon, Edit } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form States
  const [formData, setFormData] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchItems();
    }
  }, [isLoggedIn, activeTab]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      alert("Hatalı giriş");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/${activeTab}?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchItems();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/${activeTab}?id=${editingId}` : `/api/${activeTab}`;
    const method = editingId ? "PUT" : "POST";

    let submitData = { ...formData };
    if (activeTab === "projects" && typeof submitData.reels === "string") {
      submitData.reels = submitData.reels.split(",").map(item => item.trim()).filter(item => item !== "");
    }

    const res = await fetch(url, {
      method,
      body: JSON.stringify(submitData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      fetchItems();
    } else {
      alert("Hata oluştu");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono uppercase tracking-[0.3em]">Yükleniyor...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col gap-6 w-96 p-10 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter text-purple-600 mb-2">ADMIN</h1>
            <p className="text-gray-500 text-sm italic font-medium tracking-widest uppercase">Talent Agency Access</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 focus:bg-white/10 transition-all font-medium text-white"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 focus:bg-white/10 transition-all font-medium text-white"
              type="password"
              placeholder="Şifre"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-black transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98]"
              onClick={handleLogin}
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 p-8 flex flex-col gap-10 bg-[#080808]">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-purple-600">ADMIN PANEL</h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] mt-1 uppercase">Dashboard v1.0</p>
        </div>
        
        <nav className="flex flex-col gap-3">
          <button 
            onClick={() => setActiveTab("projects")}
            className={`p-4 text-sm font-bold tracking-widest rounded-xl transition-all flex items-center gap-3 ${activeTab === "projects" ? "bg-purple-600/20 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-600/5" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === "projects" ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "bg-gray-700"}`} />
            PROJELER
          </button>
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`p-4 text-sm font-bold tracking-widest rounded-xl transition-all flex items-center gap-3 ${activeTab === "blogs" ? "bg-purple-600/20 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-600/5" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === "blogs" ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "bg-gray-700"}`} />
            BLOGLAR
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto p-4 text-xs font-black tracking-[0.2em] text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 text-center uppercase"
        >
          Oturumu Kapat
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-[10px] font-black tracking-[0.5em] text-purple-600 uppercase mb-2">Management</h3>
            <h1 className="text-4xl font-black tracking-tighter uppercase">{activeTab === "projects" ? "Projeler" : "Bloglar"}</h1>
          </div>
          <button 
            onClick={() => {
              setFormData({});
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="bg-purple-600 p-3 px-6 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            YENİ EKLE
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 hover:bg-white/[0.07] transition-all group">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                <img src={item.cover || item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-xl font-black tracking-tight">{item.brand || item.title}</h4>
                  <p className="text-gray-500 text-[10px] font-bold tracking-widest mt-1 italic uppercase">
                    {item.category} • {item.year || (new Date(item.createdAt).toLocaleDateString())}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 hover:bg-purple-500/20 text-gray-600 hover:text-purple-500 rounded-lg transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-2 hover:bg-red-500/20 text-gray-600 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <p className="text-gray-600 font-bold tracking-[0.2em] italic uppercase">Henüz {activeTab} bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-black tracking-tighter uppercase">{editingId ? "DÜZENLE" : "YENİ"} {activeTab === "projects" ? "Proje" : "Blog"} SİSTEMİ</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4 overflow-y-auto">
              {activeTab === "projects" ? (
                <>
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Marka Adı" required value={formData.brand || ""} onChange={e => setFormData({...formData, brand: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kategori" required value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Yıl" required value={formData.year || ""} onChange={e => setFormData({...formData, year: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Müşteri (Client)" value={formData.client || ""} onChange={e => setFormData({...formData, client: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kapak Görseli URL" required value={formData.cover || ""} onChange={e => setFormData({...formData, cover: e.target.value})} />
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Video URL (Direct MP4)" value={formData.video || ""} onChange={e => setFormData({...formData, video: e.target.value})} />
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Reels URL'leri (Virgül ile ayırın)" value={Array.isArray(formData.reels) ? formData.reels.join(", ") : formData.reels || ""} onChange={e => setFormData({...formData, reels: e.target.value})} />
                  <textarea className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white h-32" placeholder="Proje Açıklaması" required value={formData.desc || ""} onChange={e => setFormData({...formData, desc: e.target.value})} />
                </>
              ) : (
                <>
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Blog Başlığı" required value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kategori" required value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Görsel URL" required value={formData.image || ""} onChange={e => setFormData({...formData, image: e.target.value})} />
                  <textarea className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white h-32" placeholder="Blog İçeriği" required value={formData.content || ""} onChange={e => setFormData({...formData, content: e.target.value})} />
                </>
              )}
              <div className="col-span-2 mt-4">
                <button type="submit" className="w-full bg-purple-600 p-4 rounded-xl font-black shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all uppercase tracking-widest">{editingId ? "GÜNCELLE" : "KAYDET VE YAYINLA"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
