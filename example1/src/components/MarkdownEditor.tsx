"use client";

import { useState, useMemo, useCallback, useDeferredValue } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { PluggableList } from "unified";
import "highlight.js/styles/github.css";

const INITIAL_TEXT = `# Markdown プレビューエディター

**太字**、*斜体*、~~打ち消し~~

## リスト

- アイテム1
- アイテム2
  - ネスト

## コード

\`\`\`ts
const greet = (name: string) => \`Hello, \${name}!\`;
\`\`\`

## テーブル

| 列1 | 列2 |
|-----|-----|
| A   | B   |
`;

// プラグイン配列をモジュールスコープの定数にして参照を安定化
const REMARK_PLUGINS: PluggableList = [remarkGfm];
const REHYPE_PLUGINS: PluggableList = [[rehypeHighlight, { ignoreMissing: true }]];

function downloadMarkdown(text: string) {
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.md";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function MarkdownEditor() {
  const [text, setText] = useState(INITIAL_TEXT);
  const deferredText = useDeferredValue(text);

  const { charCount, lineCount } = useMemo(() => ({
    charCount: text.length,
    lineCount: text.split("\n").length,
  }), [text]);

  const handleDownload = useCallback(() => {
    downloadMarkdown(text);
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
      {/* ツールバー */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #ddd",
        background: "#f9f9f9",
        fontSize: "13px",
      }}>
        <span style={{ color: "#666" }}>
          {charCount.toLocaleString()} 文字 / {lineCount.toLocaleString()} 行
        </span>
        <button
          type="button"
          onClick={handleDownload}
          aria-label="Markdown ファイルをダウンロード"
          style={{
            padding: "0.3rem 0.8rem",
            fontSize: "13px",
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#fff",
          }}
        >
          ↓ .md ダウンロード
        </button>
      </div>

      {/* エディター / プレビュー */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Markdown 入力エリア"
          style={{
            width: "50%",
            padding: "1rem",
            fontSize: "14px",
            fontFamily: "monospace",
            border: "none",
            borderRight: "1px solid #ddd",
            resize: "none",
            outline: "none",
          }}
        />
        <div
          style={{
            width: "50%",
            padding: "1rem",
            overflowY: "auto",
            lineHeight: 1.6,
          }}
        >
          <ReactMarkdown
            remarkPlugins={REMARK_PLUGINS}
            rehypePlugins={REHYPE_PLUGINS}
          >
            {deferredText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
