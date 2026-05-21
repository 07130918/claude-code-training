"use client";

import {
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ChangeEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styles from "./MarkdownEditor.module.css";

const STORAGE_KEY = "markdown-editor:content";
const STORAGE_CHANGE_EVENT = "markdown-editor:content-changed";
// 日本語想定の読了速度 (1分あたり文字数)
const READING_CHARS_PER_MINUTE = 600;

const DEFAULT_CONTENT = `# Markdown Preview Editor

左側に Markdown を入力すると、右側にリアルタイムでプレビューが表示されます。
入力内容はブラウザの localStorage に自動保存されます。

## 対応している記法

- **太字** / *斜体* / ~~取り消し線~~
- リンク: [Next.js](https://nextjs.org/)
- インラインコード: \`const x = 1;\`

### リスト

- 項目 1
- 項目 2
  - ネストした項目

### チェックリスト (GFM)

- [x] 完了したタスク
- [ ] 未完了のタスク

### テーブル (GFM)

| 機能 | 対応 |
| --- | :---: |
| GFM | ✅ |
| 自動保存 | ✅ |
| ダークモード | ✅ |
| シンタックスハイライト | ✅ |

### コードブロック

\`\`\`ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const users = ["Alice", "Bob"].map(greet);
console.log(users);
\`\`\`

\`\`\`python
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

### 引用

> Markdown はシンプルな記法で構造化された文書を書ける軽量マークアップ言語です。
`;

const subscribe = (callback: () => void) => {
  window.addEventListener(STORAGE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = (): string =>
  window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CONTENT;

const getServerSnapshot = (): string => DEFAULT_CONTENT;

// 日本語1文字 + 英数字1単語をそれぞれ "1語" としてカウント
const countWords = (text: string): number => {
  const matches = text.match(
    /[぀-ゟ゠-ヿ一-鿿]|[A-Za-z0-9_]+/g,
  );
  return matches?.length ?? 0;
};

export default function MarkdownEditor() {
  const content = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const stats = useMemo(() => {
    const chars = content.length;
    const words = countWords(content);
    const readingMinutes = Math.max(
      1,
      Math.ceil(chars / READING_CHARS_PER_MINUTE),
    );
    return { chars, words, readingMinutes };
  }, [content]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      window.localStorage.setItem(STORAGE_KEY, event.target.value);
      window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
    },
    [],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <section className={styles.pane}>
          <label htmlFor="markdown-input" className={styles.label}>
            Markdown
          </label>
          <textarea
            id="markdown-input"
            className={styles.textarea}
            value={content}
            onChange={handleChange}
            spellCheck={false}
            placeholder="ここに Markdown を入力..."
          />
        </section>
        <section className={styles.pane}>
          <span className={styles.label}>Preview</span>
          <article className={styles.preview}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </section>
      </div>
      <div
        className={styles.statusBar}
        role="status"
        aria-label="ドキュメント統計"
      >
        <span className={styles.stat}>
          <span className={styles.statLabel}>文字数</span>
          <span className={styles.statValue}>
            {stats.chars.toLocaleString()}
          </span>
        </span>
        <span className={styles.stat}>
          <span className={styles.statLabel}>単語数</span>
          <span className={styles.statValue}>
            {stats.words.toLocaleString()}
          </span>
        </span>
        <span className={styles.stat}>
          <span className={styles.statLabel}>推定読了時間</span>
          <span className={styles.statValue}>約 {stats.readingMinutes} 分</span>
        </span>
      </div>
    </div>
  );
}
