import React, { useState, useEffect } from "react";
import { hafalanAwal } from "./data/hafalanData";
import StatsHeader from "./components/StatsHeader";
import FilterTabs from "./components/FilterTabs";
import HafalanCard from "./components/HafalanCard";
import HafalanForm from "./components/HafalanForm";
import "./App.css";

export default function App() {
  const [hafalanList, setHafalanList] = useState(() => {
    try {
      const tersimpan = localStorage.getItem("hafalan-tracker");
      return tersimpan ? JSON.parse(tersimpan) : hafalanAwal;
    } catch {
      return hafalanAwal;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("semua");

  useEffect(() => {
    try {
      localStorage.setItem("hafalan-tracker", JSON.stringify(hafalanList));
    } catch {}
  }, [hafalanList]);

  const tambahProgress = (id) => {
    setHafalanList(prev =>
      prev.map(h =>
        h.id === id && h.progress < h.target
          ? { ...h, progress: h.progress + 1 }
          : h
      )
    );
  };

  const kurangiProgress = (id) => {
    setHafalanList(prev =>
      prev.map(h =>
        h.id === id && h.progress > 0
          ? { ...h, progress: h.progress - 1 }
          : h
      )
    );
  };

  const resetProgress = (id) => {
    setHafalanList(prev => prev.map(h => h.id === id ? { ...h, progress: 0 } : h));
  };

  const tambahSurah = ({ surah, target }) => {
    const baru = { id: Date.now(), surah, target, progress: 0 };
    setHafalanList(prev => [...prev, baru]);
    setShowForm(false);
  };

  const hapusSurah = (id) => {
    setHafalanList(prev => prev.filter(h => h.id !== id));
  };

  const displayed = hafalanList.filter(h => {
    if (filterStatus === "selesai") return h.progress >= h.target;
    if (filterStatus === "belum")   return h.progress < h.target;
    return true;
  });

  return (
    <div className="app">

      <div className="app-header">
        <h1 className="app-title">📖 Hafalan Tracker</h1>
        <p className="app-subtitle">Pantau progress hafalan Al-Qur'anmu setiap hari</p>
      </div>

      <StatsHeader hafalanList={hafalanList} />

      <div className="toolbar">
        <FilterTabs
          active={filterStatus}
          onChange={setFilterStatus}
          hafalanList={hafalanList}
        />
        <button className="btn-tambah-surah" onClick={() => setShowForm(true)}>
          + Tambah Surah
        </button>
      </div>

      {displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ fontSize: "16px", fontWeight: 600 }}>Tidak ada hafalan di sini</p>
          <small>Coba ubah filter atau tambah surah baru</small>
        </div>
      ) : (
        <div className="grid">
          {displayed.map(hafalan => (
            <HafalanCard
              key={hafalan.id}
              hafalan={hafalan}
              onTambah={tambahProgress}
              onKurangi={kurangiProgress}
              onReset={resetProgress}
              onHapus={hapusSurah}
            />
          ))}
        </div>
      )}

      {showForm && (
        <HafalanForm
          onSubmit={tambahSurah}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}
