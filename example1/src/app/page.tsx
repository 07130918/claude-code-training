import MarkdownEditor from "./_components/MarkdownEditor";
import ThemeToggle from "./_components/ThemeToggle";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Markdown Preview Editor</h1>
          <p className={styles.subtitle}>
            左側に Markdown を入力すると、右側にプレビューが表示されます (自動保存)
          </p>
        </div>
        <ThemeToggle />
      </header>
      <MarkdownEditor />
    </main>
  );
}
