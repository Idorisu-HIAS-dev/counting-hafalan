import React, { useState } from "react";
import styles from "./HafalanForm.module.css";

export default function HafalanForm({ onSubmit, onClose }) {
  const [surah, setSurah] = useState("");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!surah.trim()) return setError("Nama surah tidak boleh kosong.");
    if (!target || Number(target) < 1) return setError("Target harus angka minimal 1.");
    onSubmit({ surah: surah.trim(), target: Number(target) });
  };

  return (
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
  );
}
