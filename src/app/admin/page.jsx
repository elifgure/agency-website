"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Giriş başarılı");
      window.location.reload();
    } else {
      alert("Hatalı giriş");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-4 w-80">
        <input
          className="p-2 bg-white/10"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 bg-white/10"
          type="password"
          placeholder="Şifre"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-purple-600 p-2"
          onClick={handleLogin}
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
