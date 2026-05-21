"use client";

import { useState } from "react";
import { CURRENCIES, type ApiResponse, type CurrencyCode, type ExchangeRatesResponse } from "@/lib/types";
import { convert, formatAmount, formatUpdateTime } from "@/lib/exchange";
import styles from "./CurrencyConverter.module.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [result, setResult] = useState<ExchangeRatesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConvert() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/exchange-rates");
      const json: ApiResponse<ExchangeRatesResponse> = await res.json();
      if (!json.success) throw new Error(json.error.message);
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  const numAmount = parseFloat(amount);
  const conversions =
    result && !isNaN(numAmount) && numAmount > 0
      ? convert(numAmount, from, result.rates)
      : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>通貨換算ツール</h1>

      <div className={styles.form}>
        <label className={styles.label}>
          金額
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          変換元
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value as CurrencyCode);
              setResult(null);
            }}
            className={styles.select}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleConvert}
          disabled={loading || !amount || isNaN(numAmount)}
          className={styles.button}
        >
          {loading ? "取得中..." : "換算する"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {conversions && result && (
        <div className={styles.results}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>通貨</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map(({ currency, amount: converted }) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{formatAmount(converted, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.updated}>
            レート更新: {formatUpdateTime(result.time_last_update_utc)} (JST)
          </p>
        </div>
      )}
    </div>
  );
}
