"use client";

import { useState } from "react";
import type { ApiResponse, WeatherData } from "@/lib/types";
import styles from "./WeatherForm.module.css";

type WeatherVisual = {
  icon: string;
  gradient: string;
  color: "light" | "dark";
};

function getWeatherVisual(code: number): WeatherVisual {
  if (code === 0)
    return { icon: "☀️", gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", color: "dark" };
  if (code <= 2)
    return { icon: "🌤️", gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", color: "dark" };
  if (code <= 3)
    return { icon: "☁️", gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)", color: "light" };
  if (code <= 48)
    return { icon: "🌫️", gradient: "linear-gradient(135deg, #b8c6db 0%, #8da0b5 100%)", color: "dark" };
  if (code <= 55)
    return { icon: "🌦️", gradient: "linear-gradient(135deg, #89c4f4 0%, #5b8dee 100%)", color: "light" };
  if (code <= 65)
    return { icon: "🌧️", gradient: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)", color: "light" };
  if (code <= 75)
    return { icon: "❄️", gradient: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)", color: "dark" };
  if (code <= 82)
    return { icon: "🌧️", gradient: "linear-gradient(135deg, #2980b9 0%, #2c3e50 100%)", color: "light" };
  if (code <= 86)
    return { icon: "🌨️", gradient: "linear-gradient(135deg, #d7e8f0 0%, #9ab8cc 100%)", color: "dark" };
  return { icon: "⛈️", gradient: "linear-gradient(135deg, #373b44 0%, #4286f4 100%)", color: "light" };
}

type Props = {
  label: string;
};

export default function WeatherForm({ label }: Props) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json: ApiResponse<WeatherData> = await res.json();

      if (json.success) {
        setWeather(json.data);
      } else {
        setError(json.error.message);
      }
    } catch {
      setError("通信エラーが発生しました。ネットワーク接続を確認してください。");
    } finally {
      setLoading(false);
    }
  }

  const visual = weather ? getWeatherVisual(weather.weatherCode) : null;

  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力"
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading || !city.trim()}>
          {loading ? "…" : "検索"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {weather && visual && (
        <div
          className={`${styles.result} ${visual.color === "light" ? styles.lightText : styles.darkText}`}
          style={{ background: visual.gradient }}
        >
          <span className={styles.bgIcon} aria-hidden="true">{visual.icon}</span>
          <div className={styles.content}>
            <h2 className={styles.cityName}>{weather.city}</h2>
            <p className={styles.description}>{weather.weatherDescription}</p>
            <p className={styles.temperature}>
              {weather.temperature}{weather.unit.temperature}
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>湿度</span>
                <span className={styles.detailValue}>{weather.humidity}%</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>風速</span>
                <span className={styles.detailValue}>
                  {weather.windSpeed} {weather.unit.windSpeed}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
