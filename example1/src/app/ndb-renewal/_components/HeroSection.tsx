import styles from "../page.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <p className={styles.heroTagline}>Nippon Day Break Co., Ltd.</p>
        <h1 id="hero-heading" className={styles.heroTitle}>
          お客様と共に、<br />情報技術で未来を創る。
        </h1>
        <p className={styles.heroSub}>
          We are the company that supports the future.
        </p>
        <div className={styles.heroCtas}>
          <a href="#services" className={styles.btnPrimary}>サービスを見る</a>
          <a href="#contact" className={styles.btnOutline}>お問い合わせ</a>
        </div>
      </div>
    </section>
  );
}
