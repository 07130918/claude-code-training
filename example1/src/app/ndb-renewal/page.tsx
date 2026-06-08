import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Features from "./_components/Features";
import Recruit from "./_components/Recruit";
import News from "./_components/News";
import Contact from "./_components/Contact";

// ページ単位のメタデータ（ルート layout.tsx は全ページ共有のため変更しない）
export const metadata: Metadata = {
  title: "日本デェイブレイク｜コーポレートサイト改善モック",
  description:
    "情報システムのライフサイクル全般を一貫して支援する日本デェイブレイクのコーポレートサイト改善モック（研修用）。",
};

// /ndb-renewal トップページ：各セクションを並べる組み立て役（Server Component）
export default function NdbRenewalPage() {
  return (
    // ルート layout.tsx は lang="en"（全ページ共有のため変更しない）。
    // 本ページは日本語コンテンツのため、この範囲に lang="ja" を明示する。
    <div className={styles.page} lang="ja">
      <header className={styles.siteHeader}>
        <div className={`${styles.container} ${styles.siteHeaderInner}`}>
          <span className={styles.brand}>日本デェイブレイク</span>
          <nav className={styles.nav} aria-label="メインナビゲーション">
            <a href="#services">サービス</a>
            <a href="#features">特徴</a>
            <a href="#recruit">採用</a>
            <a href="#news">News</a>
            <a href="#contact">お問い合わせ</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Services />
        <Features />
        <Recruit />
        <News />
        <Contact />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerNote}>
            本ページはClaude Code研修用のモックです。公開情報を参考に作成した非公式ページであり、実在の数値・実績・取引先などは含みません。
          </p>
          <p className={styles.copyright}>
            © 日本デェイブレイク株式会社（研修用モック）
          </p>
        </div>
      </footer>
    </div>
  );
}
