import styles from "../page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerLogo}>日本デェイブレイク株式会社</p>
            <address className={styles.footerAddress}>
              〒105-0014 東京都港区芝2丁目9番10号 ダイユウビル
              <br />
              TEL: 03-3456-5381
            </address>
          </div>
          <div className={styles.footerBadges}>
            <span className={styles.badge}>プライバシーマーク</span>
            <span className={styles.badge}>ISO 27001</span>
            <span className={styles.badge}>ISO 9001</span>
          </div>
        </div>
        <p className={styles.footerCopyright}>
          © 日本デェイブレイク株式会社 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
