"use client";

import { useReducer, useEffect } from "react";
import { Trash2, Plus, X, Edit } from "lucide-react";
import { adminReducer, initialState } from "./adminReducer";

export default function AdminPage() {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchItems();
    }
  }, [state.isLoggedIn, state.activeTab]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) dispatch({ type: "LOGIN" });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/${state.activeTab}`);
      const data = await res.json();
      dispatch({
        type: "SET_ITEMS",
        payload: Array.isArray(data) ? data : [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: state.email.trim(),
        password: state.password.trim(),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) dispatch({ type: "LOGIN" });
    else alert("Hatalı giriş");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch({ type: "LOGOUT" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/${state.activeTab}?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = state.editingId
      ? `/api/${state.activeTab}?id=${state.editingId}`
      : `/api/${state.activeTab}`;

    const method = state.editingId ? "PUT" : "POST";

    let submitData = { ...state.formData };

    if (
      state.activeTab === "projects" &&
      typeof submitData.reels === "string"
    ) {
      submitData.reels = submitData.reels
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const res = await fetch(url, {
      method,
      body: JSON.stringify(submitData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      dispatch({ type: "CLOSE_MODAL" });
      fetchItems();
    } else alert("Hata oluştu");
  };

  const handleEdit = (item) => {
    dispatch({ type: "SET_FORM_DATA", payload: item });
    dispatch({ type: "SET_EDITING_ID", payload: item._id });
    dispatch({ type: "OPEN_MODAL" });
  };

  if (state.loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono uppercase tracking-[0.3em]">
        Yükleniyor...
      </div>
    );

  if (!state.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col gap-6 w-96 p-10 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter text-purple-600 mb-2">
              ADMIN
            </h1>
            <p className="text-gray-500 text-sm italic font-medium tracking-widest uppercase">
              Talent Agency Access
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 focus:bg-white/10 transition-all font-medium text-white"
              placeholder="Email"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "email",
                  value: e.target.value,
                })
              }
            />
            <input
              className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 focus:bg-white/10 transition-all font-medium text-white"
              type="password"
              placeholder="Şifre"
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "password",
                  value: e.target.value,
                })
              }
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
          <h2 className="text-2xl font-black tracking-tighter text-purple-600">
            ADMIN PANEL
          </h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] mt-1 uppercase">
            Dashboard v1.0
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() =>
              dispatch({
                type: "SET_FIELD",
                field: "activeTab",
                value: "projects",
              })
            }
            className={`p-4 text-sm font-bold tracking-widest rounded-xl transition-all flex items-center gap-3 ${
              state.activeTab === "projects"
                ? "bg-purple-600/20 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-600/5"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                state.activeTab === "projects"
                  ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  : "bg-gray-700"
              }`}
            />
            PROJELER
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "SET_FIELD",
                field: "activeTab",
                value: "blogs",
              })
            }
            className={`p-4 text-sm font-bold tracking-widest rounded-xl transition-all flex items-center gap-3 ${
              state.activeTab === "blogs"
                ? "bg-purple-600/20 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-600/5"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                state.activeTab === "blogs"
                  ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  : "bg-gray-700"
              }`}
            />
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
            <h3 className="text-[10px] font-black tracking-[0.5em] text-purple-600 uppercase mb-2">
              Management
            </h3>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              {state.activeTab === "projects" ? "Projeler" : "Bloglar"}
            </h1>
          </div>

          <button
            onClick={() => dispatch({ type: "OPEN_MODAL" })}
            className="bg-purple-600 p-3 px-6 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            YENİ EKLE
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {state.items.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                <img
                  src={item.cover || item.image}
                  alt=""
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-xl font-black tracking-tight">
                    {item.brand || item.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] font-bold tracking-widest mt-1 italic uppercase">
                    {item.category} •{" "}
                    {item.year ||
                      new Date(item.createdAt).toLocaleDateString()}
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
        </div>
      </div>

      {/* Modal */}
      {state.isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-black tracking-tighter uppercase">
                {state.editingId ? "DÜZENLE" : "YENİ"}{" "}
                {state.activeTab === "projects" ? "Proje" : "Blog"} SİSTEMİ
              </h2>
              <button
                onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 grid grid-cols-2 gap-4 overflow-y-auto"
            >
              {state.activeTab === "projects" ? (
                <>
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Marka Adı" required value={state.formData.brand || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "brand", value: e.target.value })} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kategori" required value={state.formData.category || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "category", value: e.target.value })} />
                  <input
                    className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white"
                    placeholder="Yıl"
                    required
                    inputMode="numeric"
                    value={state.formData.year || ""}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_FIELD",
                        field: "year",
                        value: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Müşteri (Client)" value={state.formData.client || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "client", value: e.target.value })} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kapak Görseli URL" required value={state.formData.cover || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "cover", value: e.target.value })} />
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Video URL (Direct MP4)" value={state.formData.video || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "video", value: e.target.value })} />
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Reels URL'leri (Virgül ile ayırın)" value={Array.isArray(state.formData.reels) ? state.formData.reels.join(", ") : state.formData.reels || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "reels", value: e.target.value })} />
                  <textarea className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white h-32" placeholder="Proje Açıklaması" required value={state.formData.desc || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "desc", value: e.target.value })} />
                </>
              ) : (
                <>
                  <input className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Blog Başlığı" required value={state.formData.title || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "title", value: e.target.value })} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Kategori" required value={state.formData.category || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "category", value: e.target.value })} />
                  <input className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white" placeholder="Görsel URL" required value={state.formData.image || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "image", value: e.target.value })} />
                  <textarea className="col-span-2 p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-600 text-white h-32" placeholder="Blog İçeriği" required value={state.formData.content || ""} onChange={e => dispatch({ type: "SET_FORM_FIELD", field: "content", value: e.target.value })} />
                </>
              )}

              <div className="col-span-2 mt-4">
                <button type="submit" className="w-full bg-purple-600 p-4 rounded-xl font-black shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all uppercase tracking-widest">
                  {state.editingId ? "GÜNCELLE" : "KAYDET VE YAYINLA"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
