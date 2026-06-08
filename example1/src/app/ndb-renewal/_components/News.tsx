import styles from "../page.module.css";

// Newsセクション：研修用モックのため、中身は表示確認用のサンプル
// 実在の日付・事実を装わないよう、各項目に「（サンプル）」と明記する
const newsItems = [
  {
    date: "2026.05.20",
    dateTime: "2026-05-20",
    category: "お知らせ",
    title: "（サンプル）コーポレートサイト改善モックを公開しました",
  },
  {
    date: "2026.04.15",
    dateTime: "2026-04-15",
    category: "サービス",
    title: "（サンプル）サービス紹介ページを更新しました",
  },
  {
    date: "2026.03.10",
    dateTime: "2026-03-10",
    category: "採用",
    title: "（サンプル）採用情報の掲載を開始しました",
  },
];

export default function News() {
  return (
    <section id="news" className={styles.sectionAlt} aria-labelledby="news-heading">
      <div className={styles.container}>
        <h2 id="news-heading" className={styles.sectionTitle}>
          News
        </h2>
        <p className={styles.sectionLead}>最新のお知らせを掲載します。</p>
        <ul className={styles.newsList}>
          {newsItems.map((item) => (
            <li key={item.title} className={styles.newsItem}>
              <time className={styles.newsDate} dateTime={item.dateTime}>
                {item.date}
              </time>
              <span className={styles.newsCategory}>{item.category}</span>
              <span className={styles.newsTitle}>{item.title}</span>
            </li>
          ))}
        </ul>
        <p className={styles.newsNote}>
          ※ 上記Newsは研修用モックの表示確認用サンプルです。実際のお知らせではありません。
        </p>
      </div>
    </section>
  );
}
