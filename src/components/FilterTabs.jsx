import React from "react";
import styles from "./FilterTabs.module.css";

export default function FilterTabs({ active, onChange, hafalanList }) {
  const tabs = [
    { id: "semua",   label: "Semua",   count: hafalanList.length },
    { id: "selesai", label: "✅ Selesai", count: hafalanList.filter(h => h.progress >= h.target).length },
    { id: "belum",   label: "⏳ Belum",  count: hafalanList.filter(h => h.progress < h.target).length },
  ];

  return (
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
  );
}
