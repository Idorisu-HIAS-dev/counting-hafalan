import React from "react";
import styles from "./StatusBadge.module.css";
import { getStatus } from "../utils/getStatus";

export default function StatusBadge({ progress, target }) {
  const { label, warna } = getStatus(progress, target);
  return <span className={`${styles.badge} ${styles[warna]}`}>{label}</span>;
}
