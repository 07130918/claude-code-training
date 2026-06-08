import styles from "../page.module.css";

const newsItems = [
  { date: "2026.04.01", isoDate: "2026-04-01", title: "社長交代に伴う会社情報を更新しました" },
  { date: "2025.11.10", isoDate: "2025-11-10", title: "会社概要・地図を更新しました" },
  { date: "2025.04.01", isoDate: "2025-04-01", title: "会社概要・組織図を更新しました" },
];

export default function NewsSection() {
  return (
    <section id="news" className={styles.sectionAlt}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>News</p>
        <h2 className={styles.sectionTitle}>最新情報</h2>
        <ul className={styles.newsList} aria-label="最新情報一覧">
          {newsItems.map((item) => (
            <li key={item.isoDate} className={styles.newsItem}>
              <time className={styles.newsDate} dateTime={item.isoDate}>
                {item.date}
              </time>
              <span className={styles.newsTitle}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
