"use client";

import { useState } from "react";
import styles from "./LengthConverter.module.css";

const CM_PER_INCH = 2.54;

export default function LengthConverter() {
  const [cm, setCm] = useState<string>("");
  const [inch, setInch] = useState<string>("");

  function handleCmChange(value: string) {
    setCm(value);
    const num = parseFloat(value);
    setInch(isNaN(num) ? "" : (num / CM_PER_INCH).toFixed(4));
  }

  function handleInchChange(value: string) {
    setInch(value);
    const num = parseFloat(value);
    setCm(isNaN(num) ? "" : (num * CM_PER_INCH).toFixed(4));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>長さ換算</h1>
      <p className={styles.description}>どちらかに入力すると即時換算されます</p>

      <div className={styles.form}>
        <label className={styles.label}>
          センチメートル (cm)
          <input
            type="number"
            min="0"
            step="any"
            value={cm}
            onChange={(e) => handleCmChange(e.target.value)}
            placeholder="例: 100"
            className={styles.input}
          />
        </label>

        <div className={styles.arrow}>⇅</div>

        <label className={styles.label}>
          インチ (in)
          <input
            type="number"
            min="0"
            step="any"
            value={inch}
            onChange={(e) => handleInchChange(e.target.value)}
            placeholder="例: 39.37"
            className={styles.input}
          />
        </label>
      </div>

      <p className={styles.note}>1 インチ = {CM_PER_INCH} cm</p>
    </div>
  );
}
