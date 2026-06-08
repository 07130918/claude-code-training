import styles from "../page.module.css";

// ヒーローセクション：キャッチコピー・サブコピー・CTA
// 文言は現行サイトの公開メッセージに基づく（創作なし）
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <p className={styles.heroEyebrow}>日本デェイブレイク</p>
        <h1 id="hero-heading" className={styles.heroTitle}>
          お客様と共に、
          <br />
          情報技術で未来を創る。
        </h1>
        <p className={styles.heroSubEn}>
          We are the company that supports the future.
        </p>
        <p className={styles.heroLead}>
          情報システムのライフサイクル全般を、一貫してご支援します。
        </p>
        <div className={styles.heroActions}>
          <a className={styles.btnPrimary} href="#contact">
            お問い合わせ
          </a>
          <a className={styles.btnSecondary} href="#services">
            サービスを見る
          </a>
        </div>
      </div>
    </section>
  );
}
