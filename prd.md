# PRD.md — Aplikasi Penghitung Hafalan
> Product Requirements Document · Mini Project ReactJS · Bonus Project

---

## 1. Project Overview

**Nama:** Aplikasi Penghitung Hafalan  
**Tipe:** Educational ReactJS Frontend · SPA (Single Page Application)  
**Stack:** React 18 + Vite + CSS Modules  
**State:** useState only — no Redux, no Context  
**Data:** Array of Objects, local memory (no backend, no database)  
**Bahasa UI:** Indonesia  

Aplikasi ini memungkinkan pengguna memantau progress hafalan Al-Qur'an per surah secara visual dan interaktif — tanpa reload halaman. Setiap aksi (tambah, kurangi, reset) langsung memperbarui tampilan secara realtime melalui React state.

---

## 2. Target Pengguna

| Pengguna | Konteks |
|---|---|
| Siswa pemula ReactJS | Belajar konsep React melalui project nyata |
| Pengajar frontend | Bahan ajar demo interaktif di kelas |
| Santri / penghafal Qur'an | Pengguna akhir aplikasi |

---

## 3. Tujuan Pembelajaran

Setelah menyelesaikan project ini, siswa mampu:

### React Concepts
| Konsep | Implementasi di Project |
|---|---|
| JSX | Seluruh tampilan komponen |
| Functional Components | Semua komponen menggunakan function |
| Props | Data hafalan dikirim dari App → HafalanCard |
| State | `hafalanList`, `showForm` di App.jsx |
| useState | Setiap state perubahan progress |
| Event Handling | onClick tambah, kurangi, reset |
| Conditional Rendering | Status label, tombol disable, empty state |
| Array `.map()` | Render semua kartu dari array |
| Callback Props | HafalanCard → App via onTambah, onKurangi, onReset |
| Lifting State Up | Handler update tetap di App.jsx, diturunkan via props |

### JavaScript ES6+
| Konsep | Implementasi |
|---|---|
| Arrow Functions | Semua fungsi handler |
| Destructuring | Props di setiap komponen anak |
| Spread Operator | Update progress immutably dengan `.map()` + spread |
| `.map()` | Render list kartu hafalan |
| `.filter()` | Filter surah selesai / belum selesai |

### React Architecture
| Prinsip | Diterapkan Di |
|---|---|
| Reusable Component | HafalanCard dipakai untuk semua surah |
| Top-down Data Flow | App → HafalanCard (satu arah) |
| Immutability | Tidak ada `.push()` atau mutasi langsung |
| SPA Behavior | Semua perubahan UI tanpa reload |

---

## 4. Fitur

### 4.1 Fitur Wajib
| ID | Fitur | Deskripsi |
|---|---|---|
| F01 | Tampil kartu hafalan | Setiap surah tampil sebagai kartu dengan info lengkap |
| F02 | Tambah progress | Tombol `+` menambah progress 1 ayat |
| F03 | Kurangi progress | Tombol `−` mengurangi progress 1 ayat (min 0) |
| F04 | Reset progress | Tombol reset mengembalikan progress ke 0 |
| F05 | Progress bar | Bar visual proporsi progress / target |
| F06 | Status otomatis | Label berubah otomatis berdasarkan persentase |
| F07 | Dynamic rendering | UI update realtime tanpa reload |
| F08 | Render dari array | Semua kartu di-render dengan `.map()` |

### 4.2 Fitur Bonus
| ID | Fitur | Deskripsi |
|---|---|---|
| F09 | Tambah surah baru | Form input: nama surah + target ayat |
| F10 | Hapus surah | Tombol hapus dengan konfirmasi sederhana |
| F11 | Filter status | Tab: Semua / Selesai / Belum Selesai |
| F12 | Ringkasan statistik | Header: total surah, total selesai, total progress |
| F13 | Validasi form | Input tidak boleh kosong, target harus angka positif |

---

## 5. Status Label Logic

Status berubah otomatis berdasarkan persentase `(progress / target) * 100`:

| Persentase | Status | Warna |
|---|---|---|
| 0% | Mulai | Abu-abu |
| 1% – 49% | Semangat 💪 | Biru |
| 50% – 89% | Hampir Selesai ⚡ | Kuning/Amber |
| 90% – 99% | Sebentar Lagi 🔥 | Oranye |
| 100% | Target Tercapai ✅ | Hijau |

---

## 6. Data Structure

```js
// Satu object hafalan
{
  id: Number,        // identifier unik — Date.now()
  surah: String,     // contoh: "Al-Fatihah"
  target: Number,    // total ayat target — contoh: 7
  progress: Number,  // ayat yang sudah dihafal — contoh: 3
  // 'completed' dihitung secara derived: progress >= target
}

// Contoh data awal statis (src/data/hafalanData.js)
const hafalanAwal = [
  { id: 1, surah: "Al-Fatihah",  target: 7,   progress: 7 },
  { id: 2, surah: "Al-Ikhlas",   target: 4,   progress: 2 },
  { id: 3, surah: "Al-Falaq",    target: 5,   progress: 0 },
  { id: 4, surah: "An-Nas",      target: 6,   progress: 4 },
  { id: 5, surah: "Al-Kawthar",  target: 3,   progress: 1 },
  { id: 6, surah: "Al-Asr",      target: 3,   progress: 3 },
];

// State utama di App.jsx
const [hafalanList, setHafalanList] = useState(hafalanAwal);
const [showForm, setShowForm]       = useState(false);
const [filterStatus, setFilterStatus] = useState("semua"); // "semua" | "selesai" | "belum"
```

---

## 7. Logic Utama

### Tambah Progress (immutable update)
```js
const tambahProgress = (id) => {
  setHafalanList(prev =>
    prev.map(h =>
      h.id === id && h.progress < h.target
        ? { ...h, progress: h.progress + 1 }
        : h
    )
  );
};
```

### Kurangi Progress
```js
const kurangiProgress = (id) => {
  setHafalanList(prev =>
    prev.map(h =>
      h.id === id && h.progress > 0
        ? { ...h, progress: h.progress - 1 }
        : h
    )
  );
};
```

### Reset Progress
```js
const resetProgress = (id) => {
  setHafalanList(prev =>
    prev.map(h => h.id === id ? { ...h, progress: 0 } : h)
  );
};
```

### Tambah Surah Baru
```js
const tambahSurah = ({ surah, target }) => {
  const baru = { id: Date.now(), surah, target: Number(target), progress: 0 };
  setHafalanList(prev => [...prev, baru]);
  setShowForm(false);
};
```

### Hapus Surah (.filter)
```js
const hapusSurah = (id) => {
  setHafalanList(prev => prev.filter(h => h.id !== id));
};
```

### Derived: Status Label
```js
const getStatus = (progress, target) => {
  const persen = target === 0 ? 0 : (progress / target) * 100;
  if (persen === 0)   return { label: "Mulai",            warna: "abu" };
  if (persen < 50)    return { label: "Semangat 💪",      warna: "biru" };
  if (persen < 90)    return { label: "Hampir Selesai ⚡", warna: "amber" };
  if (persen < 100)   return { label: "Sebentar Lagi 🔥", warna: "oranye" };
  return               { label: "Target Tercapai ✅",      warna: "hijau" };
};
```

---

## 8. Folder Structure

```
hafalan-tracker/
├── src/
│   ├── components/
│   │   ├── HafalanCard.jsx           ← kartu per surah
│   │   ├── HafalanCard.module.css
│   │   ├── ProgressBar.jsx           ← bar visual progress
│   │   ├── ProgressBar.module.css
│   │   ├── StatusBadge.jsx           ← badge status otomatis
│   │   ├── StatusBadge.module.css
│   │   ├── HafalanForm.jsx           ← form tambah surah baru
│   │   ├── HafalanForm.module.css
│   │   ├── FilterTabs.jsx            ← tab filter status
│   │   ├── FilterTabs.module.css
│   │   ├── StatsHeader.jsx           ← ringkasan di atas
│   │   └── StatsHeader.module.css
│   ├── data/
│   │   └── hafalanData.js            ← array data awal statis
│   ├── utils/
│   │   └── getStatus.js              ← fungsi derived status
│   ├── App.jsx                       ← semua state + handler
│   ├── App.css                       ← design system + variables
│   └── main.jsx
├── EXPLAIN.md
├── PRD.md
└── agents.md
```

---

## 9. Component Architecture

```
App.jsx  (state owner)
  │
  ├── StatsHeader        ← props: hafalanList
  ├── FilterTabs         ← props: active, onChange
  ├── [tombol + Form]    ← props: showForm, onToggleForm
  │     └── HafalanForm ← props: onSubmit, onClose
  │
  └── div.grid
        └── HafalanCard × N   ← props: hafalan, onTambah, onKurangi, onReset, onHapus
              ├── StatusBadge ← props: progress, target
              └── ProgressBar ← props: progress, target
```

**Aturan aliran data:**
- State hanya boleh ada di `App.jsx`
- Komponen anak hanya menerima data via props
- Komponen anak mengirim event ke atas via callback props
- Tidak ada komponen yang mengubah data miliknya sendiri

---

## 10. UI/UX Direction

**Tema:** Islamic Productivity Dashboard — bersih, tenang, modern  
**Palet warna utama:**

```css
:root {
  --bg:           #f8fafc;
  --surface:      #ffffff;
  --border:       #e2e8f0;
  --text:         #0f172a;
  --text-muted:   #64748b;

  /* Aksen utama */
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
}
```

**Font:** Google Fonts — Plus Jakarta Sans (400, 500, 600, 700)  
**Layout kartu:** grid auto-fill minmax(280px, 1fr)  
**Progress bar:** rounded full, background slate-100, fill warna sesuai status  
**Hover card:** translateY(-3px) + shadow lebih dalam  
**Tombol +/−:** bulat, border accent, hover background accent  
**Tombol reset:** teks kecil, warna muted, hover merah  

---

## 11. User Flow

```
1. Buka aplikasi
   → Tampil 6 kartu hafalan dari data awal

2. Lihat kartu
   → Nama surah, target ayat, progress saat ini
   → Progress bar visual
   → Badge status otomatis

3. Klik tombol +
   → Progress bertambah 1
   → Bar memanjang
   → Status bisa berubah
   → Tombol + disabled jika progress = target

4. Klik tombol −
   → Progress berkurang 1 (tidak bisa < 0)
   → Tombol − disabled jika progress = 0

5. Klik Reset
   → Progress kembali ke 0
   → Status kembali ke "Mulai"

6. Klik "+ Tambah Surah"
   → Form muncul (conditional rendering)
   → Isi nama surah + target ayat
   → Submit → kartu baru muncul di bawah

7. Klik tab filter
   → "Semua" → tampil semua
   → "Selesai" → hanya yang progress = target
   → "Belum" → hanya yang progress < target

8. Lihat StatsHeader
   → Angka total, selesai, dan progress keseluruhan update otomatis
```

---

## 12. EXPLAIN.md (Wajib Dibuat)

File pembelajaran bahasa Indonesia, cocok untuk pemula React. Wajib 8 bagian dengan contoh kode dari project ini:

1. **useState** — semua state di App.jsx, kenapa state ada di parent
2. **Props & Callback Props** — cara HafalanCard terima data dan kirim event balik
3. **Immutable Update** — kenapa tidak boleh `h.progress++`, contoh spread + map
4. **`.map()` render kartu** — dari array ke JSX, kenapa key wajib
5. **Conditional Rendering** — disabled tombol, badge status, form muncul/hilang
6. **Derived State** — kenapa `completed` tidak disimpan, tapi dihitung dari data
7. **Lifting State Up** — diagram aliran data, kenapa handler di App bukan di Card
8. **CSS Modules** — isolasi class, cara pakai `styles.namaClass`

---

## 13. Future Improvements

| Ide | Konsep Baru yang Dipelajari |
|---|---|
| Simpan ke localStorage | useEffect, JSON.stringify |
| Animasi progress bar | CSS transition + keyframes |
| Halaman statistik | react-router-dom |
| Grafik progress | library chart sederhana |
| Dark mode | CSS variables toggle |
| Notifikasi selesai | useEffect + conditional |

---

*PRD v1.0 · Aplikasi Penghitung Hafalan · Mini Project ReactJS*