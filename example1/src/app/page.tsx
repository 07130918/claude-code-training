import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ホーム",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Markdown エディター</h1>
          <p>Markdown をリアルタイムでプレビューしながら編集できます。</p>
        </div>
        <div className={styles.ctas}>
          <Link className={styles.primary} href="/editor">
            エディターを開く
          </Link>
        </div>
      </main>
    </div>
  );
}
