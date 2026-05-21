"use client";

import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import LengthConverter from "./LengthConverter";
import styles from "./ConverterTabs.module.css";

type Tab = "currency" | "length";

const TABS: { id: Tab; label: string }[] = [
  { id: "currency", label: "通貨換算" },
  { id: "length", label: "長さ換算" },
];

export default function ConverterTabs() {
  const [active, setActive] = useState<Tab>("currency");

  return (
    <div>
      <div className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`${styles.tab} ${active === tab.id ? styles.active : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "currency" && <CurrencyConverter />}
      {active === "length" && <LengthConverter />}
    </div>
  );
}
