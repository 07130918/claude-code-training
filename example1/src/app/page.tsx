import styles from "./page.module.css";
import { fetchCurrentWeather, getWeatherDescription, getWeatherCategory } from "@/lib/weather";
import { CITIES, findCity } from "@/lib/cities";
import { CitySelector } from "./components/CitySelector";

type Props = {
  searchParams: Promise<{ city?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { city: cityName } = await searchParams;
  const city = findCity(cityName ?? "東京");

  let weather = null;
  let errorMessage = null;

  try {
    weather = await fetchCurrentWeather(city.lat, city.lon, city.name);
  } catch {
    errorMessage = "天気データの取得に失敗しました。";
  }

  const { label, emoji } = weather
    ? getWeatherDescription(weather.current.weatherCode)
    : { label: "", emoji: "" };

  const category = weather ? getWeatherCategory(weather.current.weatherCode) : "rainy";

  return (
    <div className={`${styles.page} ${styles[category]}`}>
      <main className={styles.main}>
        <h1 className={styles.appTitle}>天気予報</h1>

        <CitySelector cities={CITIES} currentCity={city.name} />

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        {weather && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.city}>{weather.city}</span>
              <span className={styles.time}>
                {new Date(weather.current.time).toLocaleString("ja-JP", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className={styles.weatherMain}>
              <span className={styles.emoji}>{emoji}</span>
              <div className={styles.tempBlock}>
                <span className={styles.temperature}>
                  {weather.current.temperature}°
                </span>
                <span className={styles.description}>{label}</span>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>体感気温</span>
                <span className={styles.detailValue}>
                  {weather.current.apparentTemperature}°C
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>湿度</span>
                <span className={styles.detailValue}>
                  {weather.current.humidity}%
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>風速</span>
                <span className={styles.detailValue}>
                  {weather.current.windspeed} km/h
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
