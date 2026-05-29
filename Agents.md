# agents.md — Aplikasi Penghitung Hafalan
> Prompt siap pakai untuk OpenCode AI Agent.
> Taruh file ini bersama prd.md di root folder project, lalu jalankan OpenCode.

---

## PROMPT UTAMA — Build Project dari Nol

> Copy seluruh blok di bawah ini dan paste ke OpenCode.

```
Kamu adalah senior React developer yang bertugas membangun project
"Aplikasi Penghitung Hafalan" dari nol sesuai spesifikasi di prd.md.

LANGKAH PERTAMA: Baca prd.md yang ada di folder ini secara lengkap
sebelum menulis satu baris kode pun.

Setelah membaca, bangun project dengan urutan fase berikut:

═══════════════════════════════════════════
FASE 1 — INISIALISASI PROJECT
═══════════════════════════════════════════

Jalankan:
  npm create vite@latest hafalan-tracker -- --template react
  cd hafalan-tracker
  npm install

Buat struktur folder:
  mkdir src/components src/data src/utils

Hapus konten bawaan:
  - src/App.jsx         → timpa seluruhnya
  - src/App.css         → timpa seluruhnya
  - src/index.css       → isi hanya: body { margin: 0; }
  - src/assets/         → hapus isinya

═══════════════════════════════════════════
FASE 2 — DESIGN SYSTEM (App.css)
═══════════════════════════════════════════

Buat src/App.css dengan:

Import Google Fonts:
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

CSS Variables di :root:
  --bg:           #f8fafc;
  --surface:      #ffffff;
  --border:       #e2e8f0;
  --shadow:       0 1px 3px rgba(0,0,0,0.08);
  --shadow-hover: 0 8px 24px rgba(0,0,0,0.12);
  --text:         #0f172a;
  --text-muted:   #64748b;
  --emerald:      #10b981;
  --emerald-soft: #d1fae5;
  --blue:         #3b82f6;
  --blue-soft:    #dbeafe;
  --amber:        #f59e0b;
  --amber-soft:   #fef3c7;
  --orange:       #f97316;
  --orange-soft:  #ffedd5;
  --red:          #ef4444;
  --red-soft:     #fee2e2;
  --slate:        #94a3b8;
  --slate-soft:   #f1f5f9;
  --radius:       14px;
  --font:         'Plus Jakarta Sans', sans-serif;

Global:
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); background: var(--bg); color: var(--text);
         min-height: 100vh; -webkit-font-smoothing: antialiased; }

Layout:
  .app { max-width: 960px; margin: 0 auto; padding: 32px 20px 60px; }
  .app-header { text-align: center; margin-bottom: 32px; }
  .app-title { font-size: 26px; font-weight: 700; color: var(--text); }
  .app-subtitle { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px; margin-top: 24px; }
  .toolbar { display: flex; align-items: center; justify-content: space-between;
             flex-wrap: wrap; gap: 12px; margin-top: 24px; }
  .btn-tambah-surah { background: var(--emerald); color: white; border: none;
                      padding: 10px 20px; border-radius: 10px; font-size: 14px;
                      font-weight: 600; cursor: pointer; font-family: var(--font);
                      transition: opacity 0.2s, transform 0.2s; }
  .btn-tambah-surah:hover { opacity: 0.9; transform: translateY(-1px); }

Responsive:
  @media (max-width: 600px) {
    .app { padding: 20px 14px 40px; }
    .app-title { font-size: 20px; }
    .grid { grid-template-columns: 1fr; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .btn-tambah-surah { width: 100%; text-align: center; }
  }

═══════════════════════════════════════════
FASE 3 — DATA & UTILS
═══════════════════════════════════════════

Buat src/data/hafalanData.js:
  export const hafalanAwal = [
    { id: 1, surah: "Al-Fatihah",  target: 7,  progress: 7 },
    { id: 2, surah: "Al-Ikhlas",   target: 4,  progress: 2 },
    { id: 3, surah: "Al-Falaq",    target: 5,  progress: 0 },
    { id: 4, surah: "An-Nas",      target: 6,  progress: 4 },
    { id: 5, surah: "Al-Kawthar",  target: 3,  progress: 1 },
    { id: 6, surah: "Al-Asr",      target: 3,  progress: 3 },
  ];

Buat src/utils/getStatus.js:
  // Fungsi derived — menghitung status dari data, bukan menyimpan status
  export const getStatus = (progress, target) => {
    if (target === 0) return { label: "Mulai", warna: "abu" };
    const persen = (progress / target) * 100;
    if (persen === 0)  return { label: "Mulai",               warna: "abu"    };
    if (persen < 50)   return { label: "Semangat 💪",          warna: "biru"   };
    if (persen < 90)   return { label: "Hampir Selesai ⚡",   warna: "amber"  };
    if (persen < 100)  return { label: "Sebentar Lagi 🔥",    warna: "oranye" };
    return               { label: "Target Tercapai ✅",        warna: "hijau"  };
  };

═══════════════════════════════════════════
FASE 4 — KOMPONEN
═══════════════════════════════════════════

Buat setiap komponen BESERTA file CSS Module-nya.
Gunakan hanya CSS variables dari App.css — tidak ada hex hardcode di module.

────────────────────────────────────────────
KOMPONEN 1: StatusBadge
File: src/components/StatusBadge.jsx + StatusBadge.module.css
────────────────────────────────────────────

Props: progress, target

Logic:
  import { getStatus } from "../utils/getStatus";
  const { label, warna } = getStatus(progress, target);

JSX:
  <span className={`${styles.badge} ${styles[warna]}`}>{label}</span>

CSS Module — 5 class warna + 1 base:
  .badge { font-size: 11px; font-weight: 600; padding: 4px 10px;
           border-radius: 20px; display: inline-block; }
  .abu    { background: var(--slate-soft);   color: var(--slate);   }
  .biru   { background: var(--blue-soft);    color: var(--blue);    }
  .amber  { background: var(--amber-soft);   color: var(--amber);   }
  .oranye { background: var(--orange-soft);  color: var(--orange);  }
  .hijau  { background: var(--emerald-soft); color: var(--emerald); }

────────────────────────────────────────────
KOMPONEN 2: ProgressBar
File: src/components/ProgressBar.jsx + ProgressBar.module.css
────────────────────────────────────────────

Props: progress, target

Logic:
  const persen = target === 0 ? 0 : Math.min((progress / target) * 100, 100);
  const { warna } = getStatus(progress, target);

JSX:
  <div className={styles.track}>
    <div
      className={`${styles.fill} ${styles[warna]}`}
      style={{ width: `${persen}%` }}
    />
  </div>

CSS Module:
  .track { background: var(--slate-soft); border-radius: 999px; height: 8px;
           overflow: hidden; }
  .fill  { height: 100%; border-radius: 999px;
           transition: width 0.4s ease; }
  .abu    { background: var(--slate);   }
  .biru   { background: var(--blue);   }
  .amber  { background: var(--amber);  }
  .oranye { background: var(--orange); }
  .hijau  { background: var(--emerald);}

────────────────────────────────────────────
KOMPONEN 3: HafalanCard
File: src/components/HafalanCard.jsx + HafalanCard.module.css
────────────────────────────────────────────

Props: hafalan, onTambah, onKurangi, onReset, onHapus

Destructuring di dalam komponen:
  const { id, surah, target, progress } = hafalan;
  const selesai = progress >= target;

JSX struktur:
  <div className={`${styles.card} ${selesai ? styles.selesai : ""}`}>

    {/* Header: nama surah + badge status */}
    <div className={styles.cardHeader}>
      <h3 className={styles.surahName}>{surah}</h3>
      <StatusBadge progress={progress} target={target} />
    </div>

    {/* Progress info */}
    <div className={styles.progressInfo}>
      <span className={styles.angka}>{progress}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.target}>{target} ayat</span>
    </div>

    {/* Progress bar */}
    <ProgressBar progress={progress} target={target} />

    {/* Tombol aksi */}
    <div className={styles.actions}>
      <button
        className={styles.btnKurangi}
        onClick={() => onKurangi(id)}
        disabled={progress === 0}
      >−</button>

      <button
        className={styles.btnReset}
        onClick={() => onReset(id)}
      >Reset</button>

      <button
        className={styles.btnTambah}
        onClick={() => onTambah(id)}
        disabled={selesai}
      >+</button>
    </div>

    {/* Tombol hapus */}
    <button className={styles.btnHapus} onClick={() => onHapus(id)}>
      ✕
    </button>

  </div>

CSS Module HafalanCard:
  .card { background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 20px; position: relative;
          box-shadow: var(--shadow); transition: transform 0.2s, box-shadow 0.2s; }
  .card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
  .selesai { border-color: var(--emerald); background: #f0fdf9; }

  .cardHeader { display: flex; justify-content: space-between;
                align-items: flex-start; margin-bottom: 12px; gap: 8px; }
  .surahName  { font-size: 16px; font-weight: 700; color: var(--text); }

  .progressInfo { display: flex; align-items: baseline; gap: 4px; margin-bottom: 10px; }
  .angka    { font-size: 28px; font-weight: 700; color: var(--text); }
  .separator{ font-size: 18px; color: var(--text-muted); }
  .target   { font-size: 13px; color: var(--text-muted); }

  .actions { display: flex; align-items: center; justify-content: space-between;
             gap: 8px; margin-top: 16px; }

  /* Tombol + dan − bulat */
  .btnTambah, .btnKurangi {
    width: 40px; height: 40px; border-radius: 50%; border: 2px solid;
    font-size: 20px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; line-height: 1;
  }
  .btnTambah  { border-color: var(--emerald); color: var(--emerald); background: white; }
  .btnTambah:hover:not(:disabled)  { background: var(--emerald); color: white; }
  .btnKurangi { border-color: var(--blue);    color: var(--blue);    background: white; }
  .btnKurangi:hover:not(:disabled) { background: var(--blue);    color: white; }
  .btnTambah:disabled, .btnKurangi:disabled {
    opacity: 0.3; cursor: not-allowed;
  }

  .btnReset { background: none; border: none; font-size: 12px; color: var(--text-muted);
              cursor: pointer; padding: 6px 10px; border-radius: 6px; font-family: var(--font);
              transition: color 0.15s, background 0.15s; }
  .btnReset:hover { color: var(--red); background: var(--red-soft); }

  .btnHapus { position: absolute; top: 12px; right: 12px; background: none;
              border: none; color: var(--border); cursor: pointer; font-size: 14px;
              width: 24px; height: 24px; display: flex; align-items: center;
              justify-content: center; border-radius: 4px; transition: color 0.15s; }
  .btnHapus:hover { color: var(--red); }

────────────────────────────────────────────
KOMPONEN 4: StatsHeader
File: src/components/StatsHeader.jsx + StatsHeader.module.css
────────────────────────────────────────────

Props: hafalanList

Logic (hitung derived stats dari props — tidak ada state baru):
  const total       = hafalanList.length;
  const selesai     = hafalanList.filter(h => h.progress >= h.target).length;
  const totalAyat   = hafalanList.reduce((sum, h) => sum + h.progress, 0);
  const targetAyat  = hafalanList.reduce((sum, h) => sum + h.target, 0);
  const persen      = targetAyat === 0 ? 0 : Math.round((totalAyat / targetAyat) * 100);

JSX:
  <div className={styles.statsGrid}>
    <div className={styles.statCard}>
      <span className={styles.statAngka}>{total}</span>
      <span className={styles.statLabel}>Total Surah</span>
    </div>
    <div className={styles.statCard}>
      <span className={`${styles.statAngka} ${styles.hijau}`}>{selesai}</span>
      <span className={styles.statLabel}>Selesai</span>
    </div>
    <div className={styles.statCard}>
      <span className={styles.statAngka}>{totalAyat}</span>
      <span className={styles.statLabel}>Ayat Dihafal</span>
    </div>
    <div className={styles.statCard}>
      <span className={`${styles.statAngka} ${styles.biru}`}>{persen}%</span>
      <span className={styles.statLabel}>Total Progress</span>
    </div>
  </div>

CSS Module:
  .statsGrid { display: grid; grid-template-columns: repeat(4, 1fr);
               gap: 12px; margin-bottom: 8px; }
  .statCard  { background: var(--surface); border: 1px solid var(--border);
               border-radius: var(--radius); padding: 16px; text-align: center;
               box-shadow: var(--shadow); }
  .statAngka { display: block; font-size: 26px; font-weight: 700; color: var(--text); }
  .statLabel { display: block; font-size: 11px; color: var(--text-muted);
               margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .hijau { color: var(--emerald); }
  .biru  { color: var(--blue);   }
  @media (max-width: 600px) {
    .statsGrid { grid-template-columns: repeat(2, 1fr); }
  }

────────────────────────────────────────────
KOMPONEN 5: FilterTabs
File: src/components/FilterTabs.jsx + FilterTabs.module.css
────────────────────────────────────────────

Props: active, onChange, hafalanList

Logic — hitung count per tab dari props:
  const tabs = [
    { id: "semua",   label: "Semua",   count: hafalanList.length },
    { id: "selesai", label: "✅ Selesai", count: hafalanList.filter(h => h.progress >= h.target).length },
    { id: "belum",   label: "⏳ Belum",  count: hafalanList.filter(h => h.progress < h.target).length },
  ];

JSX: render tabs.map() → button dengan badge count
  <div className={styles.tabs}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={`${styles.tab} ${active === tab.id ? styles.active : ""}`}
        onClick={() => onChange(tab.id)}
      >
        {tab.label}
        <span className={styles.badge}>{tab.count}</span>
      </button>
    ))}
  </div>

CSS Module:
  .tabs { display: flex; gap: 8px; }
  .tab  { background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; padding: 8px 16px; cursor: pointer;
          font-size: 13px; font-weight: 500; color: var(--text-muted);
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s; font-family: var(--font); }
  .tab:hover { border-color: var(--emerald); color: var(--emerald); }
  .active    { background: var(--emerald-soft); border-color: var(--emerald);
               color: var(--emerald); }
  .badge { background: var(--slate-soft); color: var(--slate);
           font-size: 11px; padding: 2px 7px; border-radius: 10px; font-weight: 600; }
  .active .badge { background: var(--emerald); color: white; }

────────────────────────────────────────────
KOMPONEN 6: HafalanForm
File: src/components/HafalanForm.jsx + HafalanForm.module.css
────────────────────────────────────────────

Props: onSubmit, onClose

State lokal form (hanya di komponen ini):
  const [surah, setSurah]   = useState("");
  const [target, setTarget] = useState("");
  const [error, setError]   = useState("");

Handler submit:
  const handleSubmit = () => {
    if (!surah.trim())         return setError("Nama surah tidak boleh kosong.");
    if (!target || Number(target) < 1) return setError("Target harus angka minimal 1.");
    onSubmit({ surah: surah.trim(), target: Number(target) });
  };

JSX — form sederhana tanpa tag <form>:
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Tambah Surah Baru</h2>
        <button className={styles.btnClose} onClick={onClose}>✕</button>
      </div>
      <div className={styles.field}>
        <label>Nama Surah</label>
        <input type="text" placeholder="contoh: Al-Mulk"
          value={surah} onChange={e => { setSurah(e.target.value); setError(""); }} />
      </div>
      <div className={styles.field}>
        <label>Target Ayat</label>
        <input type="number" min="1" placeholder="contoh: 30"
          value={target} onChange={e => { setTarget(e.target.value); setError(""); }} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.modalActions}>
        <button className={styles.btnBatal} onClick={onClose}>Batal</button>
        <button className={styles.btnSimpan} onClick={handleSubmit}>+ Simpan</button>
      </div>
    </div>
  </div>

CSS Module:
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4);
             display: flex; align-items: center; justify-content: center;
             z-index: 200; padding: 20px; }
  .modal   { background: var(--surface); border-radius: var(--radius);
             padding: 28px; width: 100%; max-width: 400px;
             box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
  .modalHeader { display: flex; justify-content: space-between;
                 align-items: center; margin-bottom: 20px; }
  .modalTitle  { font-size: 18px; font-weight: 700; }
  .btnClose    { background: none; border: none; font-size: 18px; cursor: pointer;
                 color: var(--text-muted); padding: 4px; }
  .field       { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .field label { font-size: 13px; font-weight: 600; color: var(--text-muted); }
  .field input { padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px;
                 font-size: 14px; font-family: var(--font); outline: none;
                 transition: border-color 0.2s; }
  .field input:focus { border-color: var(--emerald);
                       box-shadow: 0 0 0 3px var(--emerald-soft); }
  .error { color: var(--red); font-size: 13px; margin-bottom: 12px; }
  .modalActions { display: flex; gap: 10px; justify-content: flex-end; }
  .btnBatal  { background: var(--slate-soft); border: none; padding: 10px 20px;
               border-radius: 10px; cursor: pointer; font-family: var(--font);
               font-weight: 500; font-size: 14px; color: var(--text-muted); }
  .btnSimpan { background: var(--emerald); color: white; border: none;
               padding: 10px 20px; border-radius: 10px; cursor: pointer;
               font-family: var(--font); font-weight: 600; font-size: 14px; }
  .btnSimpan:hover { opacity: 0.9; }

═══════════════════════════════════════════
FASE 5 — App.jsx (State Owner)
═══════════════════════════════════════════

Import:
  import { useState } from "react";
  import { hafalanAwal } from "./data/hafalanData";
  import StatsHeader from "./components/StatsHeader";
  import FilterTabs  from "./components/FilterTabs";
  import HafalanCard from "./components/HafalanCard";
  import HafalanForm from "./components/HafalanForm";
  import "./App.css";

State:
  const [hafalanList, setHafalanList]     = useState(hafalanAwal);
  const [showForm, setShowForm]           = useState(false);
  const [filterStatus, setFilterStatus]   = useState("semua");

Handler tambahProgress — immutable update dengan map + spread:
  const tambahProgress = (id) => {
    setHafalanList(prev =>
      prev.map(h =>
        h.id === id && h.progress < h.target
          ? { ...h, progress: h.progress + 1 }
          : h
      )
    );
  };

Handler kurangiProgress:
  const kurangiProgress = (id) => {
    setHafalanList(prev =>
      prev.map(h =>
        h.id === id && h.progress > 0
          ? { ...h, progress: h.progress - 1 }
          : h
      )
    );
  };

Handler resetProgress:
  const resetProgress = (id) => {
    setHafalanList(prev =>
      prev.map(h => h.id === id ? { ...h, progress: 0 } : h)
    );
  };

Handler tambahSurah — spread operator untuk tambah item baru:
  const tambahSurah = ({ surah, target }) => {
    const baru = { id: Date.now(), surah, target, progress: 0 };
    setHafalanList(prev => [...prev, baru]);
    setShowForm(false);
  };

Handler hapusSurah — .filter untuk hapus:
  const hapusSurah = (id) => {
    setHafalanList(prev => prev.filter(h => h.id !== id));
  };

Filter pipeline (dijalankan setiap render, tidak ada state baru):
  const displayed = hafalanList.filter(h => {
    if (filterStatus === "selesai") return h.progress >= h.target;
    if (filterStatus === "belum")   return h.progress < h.target;
    return true;
  });

JSX return:
  <div className="app">

    {/* Header */}
    <div className="app-header">
      <h1 className="app-title">📖 Hafalan Tracker</h1>
      <p className="app-subtitle">Pantau progress hafalan Al-Qur'anmu setiap hari</p>
    </div>

    {/* Statistik ringkasan */}
    <StatsHeader hafalanList={hafalanList} />

    {/* Toolbar: filter + tombol tambah */}
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

    {/* Empty state — conditional rendering */}
    {displayed.length === 0 ? (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
        <p style={{ fontSize: "16px", fontWeight: 600 }}>Tidak ada hafalan di sini</p>
        <small>Coba ubah filter atau tambah surah baru</small>
      </div>
    ) : (
      /* Grid kartu — render dengan .map() */
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

    {/* Form modal — conditional rendering */}
    {showForm && (
      <HafalanForm
        onSubmit={tambahSurah}
        onClose={() => setShowForm(false)}
      />
    )}

  </div>

═══════════════════════════════════════════
FASE 6 — EXPLAIN.md
═══════════════════════════════════════════

Buat EXPLAIN.md di root folder. Bahasa Indonesia, untuk pemula React.
8 bagian wajib, masing-masing dengan contoh kode dari project ini:

1. useState — semua state di App.jsx dan tujuannya masing-masing
2. Props & Callback Props — diagram Parent→Child, contoh onTambah, onHapus
3. Immutable Update — kenapa tidak boleh h.progress++, contoh spread + map
4. .map() render kartu — dari array ke JSX, kenapa key wajib
5. .filter() — filter tab + hapus surah, perbedaan keduanya
6. Conditional Rendering — 3 cara: ternary, &&, disabled prop — contoh dari project
7. Derived State — kenapa selesai dan persen tidak disimpan di state, tapi dihitung
8. Lifting State Up — kenapa form state naik ke App, diagram aliran data

═══════════════════════════════════════════
ATURAN WAJIB SELAMA PENGERJAAN
═══════════════════════════════════════════

1. Semua state utama HANYA di App.jsx
   → HafalanForm boleh punya state lokal untuk field input saja

2. Tidak ada mutasi langsung
   → Dilarang: h.progress++, arr.push(), arr[i] = ...
   → Wajib: .map() + spread, [...prev, baru], .filter()

3. Setiap komponen wajib punya CSS Module sendiri
   → Tidak ada styling inline kecuali nilai yang dihitung secara dinamis (width bar)

4. Semua warna wajib pakai CSS variables
   → Tidak ada hex hardcode di dalam CSS Module

5. Tidak ada tag <form> dalam JSX
   → Gunakan div + button onClick untuk submit

6. Setelah semua file selesai:
   → Jalankan npm run build
   → Jika ada error, debug dan perbaiki dulu
   → Jangan laporkan selesai sebelum build sukses

═══════════════════════════════════════════
HASIL AKHIR YANG DIHARAPKAN
═══════════════════════════════════════════

- npm run dev → jalan langsung di localhost tanpa error
- npm run build → sukses tanpa warning atau error
- 6 kartu hafalan tampil dari data awal
- Tombol + menambah progress, tombol − mengurangi
- Tombol + disabled saat progress = target
- Tombol − disabled saat progress = 0
- Badge status berubah otomatis (Mulai → Semangat → ... → Selesai)
- Progress bar memanjang/memendek sesuai progress
- Tombol Reset mengembalikan progress ke 0
- Tombol "+ Tambah Surah" membuka form modal
- Validasi form: tidak bisa submit jika field kosong atau target < 1
- Surah baru muncul di grid setelah submit
- Tombol ✕ menghapus kartu dari daftar
- Tab filter (Semua/Selesai/Belum) bekerja
- StatsHeader update otomatis setiap perubahan
- Empty state muncul jika hasil filter kosong
- Responsive di layar 375px
- EXPLAIN.md ada dan lengkap 8 bagian
```

---

## PROMPT LANJUTAN — Tambah localStorage

> Jalankan ini setelah Prompt Utama selesai dan project berjalan normal.

```
Tambahkan fitur persistensi localStorage ke project Hafalan Tracker yang sudah ada.

Baca src/App.jsx terlebih dahulu.

Perubahan di App.jsx:

1. Ubah inisialisasi state hafalanList menjadi lazy init:
   const [hafalanList, setHafalanList] = useState(() => {
     try {
       const tersimpan = localStorage.getItem("hafalan-tracker");
       return tersimpan ? JSON.parse(tersimpan) : hafalanAwal;
     } catch {
       return hafalanAwal;
     }
   });

2. Tambah useEffect di bawah state (import useEffect dari react):
   useEffect(() => {
     localStorage.setItem("hafalan-tracker", JSON.stringify(hafalanList));
   }, [hafalanList]);

Tidak ada perubahan lain. Logika, komponen, dan tampilan tetap sama.
Setelah perubahan: npm run build harus tetap sukses.
```

---

*agents.md · Aplikasi Penghitung Hafalan · Mini Project ReactJS*