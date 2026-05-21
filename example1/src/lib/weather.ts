import type { WeatherData } from "./types";

const WEATHER_CODE_MAP: Record<number, { label: string; emoji: string }> = {
  0: { label: "快晴", emoji: "☀️" },
  1: { label: "ほぼ晴れ", emoji: "🌤️" },
  2: { label: "一部曇り", emoji: "⛅" },
  3: { label: "曇り", emoji: "☁️" },
  45: { label: "霧", emoji: "🌫️" },
  48: { label: "霧", emoji: "🌫️" },
  51: { label: "霧雨", emoji: "🌦️" },
  53: { label: "霧雨", emoji: "🌦️" },
  55: { label: "濃い霧雨", emoji: "🌧️" },
  61: { label: "小雨", emoji: "🌧️" },
  63: { label: "雨", emoji: "🌧️" },
  65: { label: "大雨", emoji: "⛈️" },
  71: { label: "小雪", emoji: "🌨️" },
  73: { label: "雪", emoji: "❄️" },
  75: { label: "大雪", emoji: "❄️" },
  77: { label: "雪粒", emoji: "🌨️" },
  80: { label: "にわか雨", emoji: "🌦️" },
  81: { label: "にわか雨", emoji: "🌧️" },
  82: { label: "強いにわか雨", emoji: "⛈️" },
  85: { label: "にわか雪", emoji: "🌨️" },
  86: { label: "強いにわか雪", emoji: "❄️" },
  95: { label: "雷雨", emoji: "⛈️" },
  96: { label: "雷雨（ひょう）", emoji: "⛈️" },
  99: { label: "激しい雷雨", emoji: "🌩️" },
};

export function getWeatherDescription(code: number): {
  label: string;
  emoji: string;
} {
  return WEATHER_CODE_MAP[code] ?? { label: "不明", emoji: "🌡️" };
}

export type WeatherCategory = "sunny" | "cloudy" | "rainy";

export function getWeatherCategory(code: number): WeatherCategory {
  if (code <= 1) return "sunny";
  if (code <= 48) return "cloudy";
  return "rainy";
}

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
  city: string
): Promise<WeatherData> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,relative_humidity_2m,weathercode,windspeed_10m"
  );
  url.searchParams.set("timezone", "Asia/Tokyo");

  const res = await fetch(url.toString(), { next: { revalidate: 1800 } });
  if (!res.ok) {
    throw new Error(`Open-Meteo API error: ${res.status}`);
  }

  const data = await res.json();
  const c = data.current;

  return {
    city,
    current: {
      temperature: Math.round(c.temperature_2m),
      apparentTemperature: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windspeed: Math.round(c.windspeed_10m),
      weatherCode: c.weathercode,
      time: c.time,
    },
  };
}
