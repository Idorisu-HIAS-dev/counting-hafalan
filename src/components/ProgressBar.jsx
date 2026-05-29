import React from "react";
import styles from "./ProgressBar.module.css";
import { getStatus } from "../utils/getStatus";

export default function ProgressBar({ progress, target }) {
  const persen = target === 0 ? 0 : Math.min((progress / target) * 100, 100);
  const { warna } = getStatus(progress, target);
  return (
    <div className={styles.track}>
      <div
        className={`${styles.fill} ${styles[warna]}`}
        style={{ width: `${persen}%` }}
      />
    </div>
  );
}
