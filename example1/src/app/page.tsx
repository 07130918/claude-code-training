import WeatherForm from "./WeatherForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>天気予報</h1>
      <div className={styles.grid}>
        <WeatherForm label="都市 1" />
        <WeatherForm label="都市 2" />
      </div>
    </div>
  );
}
