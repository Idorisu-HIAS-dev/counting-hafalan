import React from "react";
import styles from "./HafalanCard.module.css";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

export default function HafalanCard({ hafalan, onTambah, onKurangi, onReset, onHapus }) {
  const { id, surah, target, progress } = hafalan;
  const selesai = progress >= target;

  return (
    <div className={`${styles.card} ${selesai ? styles.selesai : ""}`}>

      <div className={styles.cardHeader}>
        <h3 className={styles.surahName}>{surah}</h3>
        <StatusBadge progress={progress} target={target} />
      </div>

      <div className={styles.progressInfo}>
        <span className={styles.angka}>{progress}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.target}>{target} ayat</span>
      </div>

      <ProgressBar progress={progress} target={target} />

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

      <button className={styles.btnHapus} onClick={() => onHapus(id)}>
        ✕
      </button>

    </div>
  );
}
