import React from "react";
import styles from "./StatsHeader.module.css";

export default function StatsHeader({ hafalanList }) {
  const total = hafalanList.length;
  const selesai = hafalanList.filter(h => h.progress >= h.target).length;
  const totalAyat = hafalanList.reduce((sum, h) => sum + h.progress, 0);
  const targetAyat = hafalanList.reduce((sum, h) => sum + h.target, 0);
  const persen = targetAyat === 0 ? 0 : Math.round((totalAyat / targetAyat) * 100);

  return (
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
  );
}
