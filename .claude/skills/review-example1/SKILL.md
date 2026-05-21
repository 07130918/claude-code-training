---
name: review-example1
description: example1（Next.js 16プロジェクト）の現状コードをレビューする。App Router・TypeScript・Vitest・ESLintの観点で網羅的にチェックし、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。
allowed-tools: Read, Grep, Glob, Bash(npm run lint:*), Bash(npm run test:*)
argument-hint: [対象ファイルまたはディレクトリ（省略時はexample1全体）]
---

# example1 コードレビュー

`example1/` ディレクトリ（Next.js 16プロジェクト）のコードを現状レビューする。

- `$ARGUMENTS` が指定されている場合: そのファイル/ディレクトリを対象にレビュー
- `$ARGUMENTS` が空の場合: `example1/` 全体を対象にレビュー

## レビュー手順

### 1. プロジェクト構造の把握

まず以下のファイルを読んで全体像を掴む:

- `example1/package.json` — 依存関係・スクリプト
- `example1/next.config.ts` — Next.js設定
- `example1/tsconfig.json` — TypeScript設定
- `example1/vitest.config.ts` — テスト設定
- `example1/eslint.config.mjs` — ESLint設定

### 2. ソースコードの確認

以下を順に確認する:

- `example1/src/app/layout.tsx` — ルートレイアウト
- `example1/src/app/page.tsx` — トップページ
- `example1/src/app/api/` 以下の全APIルート
- `example1/src/lib/` 以下の共通モジュール

### 3. Next.js 16 / App Router ベストプラクティスチェック

- Server Components / Client Components の適切な分離（`"use client"` の必要性）
- `Image` コンポーネントの `alt`・`width`・`height`・`priority` 属性の適切な指定
- `<a>` タグの代わりに `Link` コンポーネントを使うべき箇所がないか
- `metadata` オブジェクトによるSEO設定の有無
- API ルートの `NextResponse` / `NextRequest` の正しい使用
- `loading.tsx` / `error.tsx` などのファイルベース UI の活用状況

### 4. TypeScript 型安全性チェック

- `any` の不必要な使用がないか
- 型定義（`src/lib/types.ts` 等）が適切に共有・活用されているか
- API レスポンス型の一貫性
- Props 型定義の網羅性

### 5. テストチェック（Vitest）

- `*.test.ts` / `*.test.tsx` の存在確認
- テストケースが主要なロジックをカバーしているか
- モック・スパイの適切な使用
- `happy-dom` 環境前提の DOM テストの妥当性

### 6. セキュリティチェック

- APIキー・シークレットのハードコードがないか
- 外部リンクに `rel="noopener noreferrer"` が付いているか
- 入力バリデーションの実施状況
- `next.config.ts` でのヘッダー・CSP 設定

### 7. パフォーマンスチェック

- `Image` の `priority` 指定（LCP対象画像）
- 不要なクライアントサイドレンダリングがないか
- フォントの最適化（`next/font` の活用）

## レビュー結果の報告フォーマット

### ✅ 良い点
- 適切に実装されている箇所を具体的にリストアップ

### ⚠️ 改善提案
- 改善が推奨される点を重要度と理由付きでリストアップ
- 対象ファイルのパスと行番号を明記する

### 🚨 重大な問題
- セキュリティ・バグ・型エラーなど修正必須の問題をリストアップ
- 対象ファイルのパスと行番号を明記する

### 💡 オプション提案
- 必須ではないが検討に値する改善案（Next.js 16の新機能活用等）

## 注意事項

- Next.js 16（App Router）・React 19・TypeScript・Vitest 4 の文脈でレビューする
- 問題の指摘だけでなく、修正例のコードスニペットも可能な限り示す
- `example1/CLAUDE.md` があれば読んでプロジェクト固有の方針を確認する
