EXPLAIN.md — Penjelasan untuk Pemula (Bahasa Indonesia)

1. useState
   - Apa itu: useState adalah cara menyimpan data yang bisa berubah di React.
   - Di mana: Semua state utama ada di App.jsx: hafalanList, showForm, filterStatus.
   - Contoh singkat dari project:

     const [hafalanList, setHafalanList] = useState(() => { ... });

   - Mengapa: Karena App adalah "pemilik data" (state owner). Komponen lain hanya menerima data lewat props.

2. Props & Callback Props
   - Apa itu: Props adalah parameter yang dikirim dari parent ke child. Callback props adalah fungsi yang dikirim child untuk memberi tahu parent ketika sesuatu terjadi.
   - Contoh parent → child: <HafalanCard hafalan={hafalan} />
   - Contoh callback: <HafalanCard onTambah={tambahProgress} />
   - Alur: User klik tombol di HafalanCard → child memanggil onTambah(id) → App menerima event dan mengubah state.

3. Immutable Update
   - Apa itu: Jangan mengubah data lama secara langsung. Selalu buat salinan baru ketika memperbarui array/objek.
   - Kenapa: React butuh referensi baru untuk mengetahui ada perubahan dan melakukan re-render.
   - Contoh yang salah: h.progress++ atau arr.push()
   - Contoh yang benar (dipakai di project):

     setHafalanList(prev => prev.map(h =>
       h.id === id ? { ...h, progress: h.progress + 1 } : h
     ));

4. .map() render kartu
   - Apa itu: .map() mengubah array menjadi array baru. Di React, kita gunakan untuk membuat list JSX.
   - Contoh di project:

     {displayed.map(hafalan => (
       <HafalanCard key={hafalan.id} hafalan={hafalan} ... />
     ))}

   - Kenapa perlu key: Key membantu React membedakan tiap elemen ketika array berubah sehingga render lebih efisien.

5. Conditional Rendering
   - Cara-cara yang dipakai:
     1) Ternary (?:) untuk empty state — tampilkan pesan jika tidak ada data.
     2) Logical && untuk beberapa kasus singkat (tidak banyak dipakai di project).
     3) Disabled prop pada tombol (+ dan −) untuk mencegah aksi yang tidak valid.
   - Contoh disabled:

     <button disabled={progress === 0}>−</button>

6. Derived State
   - Apa itu: Nilai yang dihitung dari state lain, bukan disimpan sendiri.
   - Contoh: Status label (Mulai, Semangat, dst.) dihitung dari progress dan target melalui fungsi getStatus.
   - Kenapa: Menyimpan derived state beresiko membuat data tidak sinkron. Lebih aman menghitung saat render.

7. Lifting State Up
   - Apa itu: Memindahkan state ke komponen yang lebih tinggi agar beberapa child dapat berbagi data.
   - Di project: Form, FilterTabs, StatsHeader, dan HafalanCard semuanya bergantung pada hafalanList yang ada di App.
   - Alur data: App (state) → props ke child. Child berkomunikasi balik lewat callback props untuk mengubah state di App.

8. CSS Modules
   - Apa itu: Setiap komponen punya file CSS sendiri (mis. HafalanCard.module.css). Nama kelas tidak bocor ke komponen lain.
   - Cara pakai di JS: import styles from "./HafalanCard.module.css"; lalu gunakan className={styles.card}
   - Keuntungan: Tidak ada bentrok nama kelas, mudah dikelola.

Penutup singkat:
  Project ini mengajarkan aliran data satu arah (top-down), cara menulis update yang aman (immutable), dan pola dasar React seperti props, state, dan komposisi komponen.
