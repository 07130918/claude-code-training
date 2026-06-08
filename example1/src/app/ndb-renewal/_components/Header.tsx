import styles from "../page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <span className={styles.logo}>日本デェイブレイク株式会社</span>
        <nav className={styles.nav} aria-label="主要ナビゲーション">
          <a href="#services" className={styles.navLink}>サービス</a>
          <a href="#features" className={styles.navLink}>会社の特徴</a>
          <a href="#recruit" className={styles.navLink}>採用</a>
          <a href="#news" className={styles.navLink}>News</a>
          <a href="#contact" className={styles.navLink}>お問い合わせ</a>
        </nav>
      </div>
    </header>
  );
}
