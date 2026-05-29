export const getStatus = (progress, target) => {
  if (target === 0) return { label: "Mulai", warna: "abu" };
  const persen = (progress / target) * 100;
  if (persen === 0)  return { label: "Mulai",               warna: "abu"    };
  if (persen < 50)   return { label: "Semangat 💪",          warna: "biru"   };
  if (persen < 90)   return { label: "Hampir Selesai ⚡",   warna: "amber"  };
  if (persen < 100)  return { label: "Sebentar Lagi 🔥",    warna: "oranye" };
  return               { label: "Target Tercapai ✅",        warna: "hijau"  };
};
