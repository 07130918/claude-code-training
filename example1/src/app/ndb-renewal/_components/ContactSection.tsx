import styles from "../page.module.css";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contactBox}>
          <h2 className={styles.contactTitle}>お問い合わせ</h2>
          <p className={styles.contactDesc}>
            システム開発・運用に関するご相談はお気軽にどうぞ。
          </p>
          <div className={styles.contactActions}>
            <div className={styles.telBlock}>
              <a href="tel:0334565381" className={styles.telNum}>
                03-3456-5381
              </a>
              <span className={styles.telHours}>受付時間 10:00〜16:00</span>
            </div>
            <a href="https://ndbnet.co.jp" className={styles.btnNavy}>
              お問い合わせフォームへ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
