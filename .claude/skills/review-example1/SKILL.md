---
name: review-example1
description: example1ディレクトリ配下のNext.js 16コードをレビューする。App Router・Server/Client Components・TypeScript型・Vitest・パフォーマンスの観点でチェックし、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。example1のコードレビューを依頼されたときに使う。
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git status:*)
argument-hint: [対象ファイルまたはディレクトリ（省略時は example1/ 全体）]
---

# example1 コードレビュー

`example1/` ディレクトリ配下の Next.js 16 プロジェクトをレビューする。

- `$ARGUMENTS` が指定されている場合: `example1/$ARGUMENTS` を対象にレビューする
- `$ARGUMENTS` が空の場合: `example1/src/` 全体を対象にレビューする

## レビュー手順

### 1. 対象ファイルの把握

対象ディレクトリ/ファイルを Glob・Read で確認する。

### 2. Next.js 16 固有のチェック

- **App Router の規約**
  - `page.tsx` / `layout.tsx` / `loading.tsx` / `error.tsx` の適切な配置
  - ネストされたレイアウトが意図通り機能しているか
  - 動的ルート（`[id]`）のパラメータ型定義

- **Server Components / Client Components**
  - `"use client"` の不要な多用がないか（デフォルトは Server）
  - Server Component 内でブラウザ API（`window`, `localStorage`）を使っていないか
  - Client Component に秘密情報（APIキー等）が含まれていないか
  - Server/Client の境界が適切に設計されているか

- **データ取得**
  - `fetch` のキャッシュ設定（`cache: 'no-store'` / `revalidate`）が適切か
  - 不必要なウォーターフォールが発生していないか（並列 fetch を使えるか）

- **Turbopack 対応**
  - Turbopack 非対応の設定やプラグインを使っていないか

### 3. TypeScript / 型チェック

- 適切な型定義があるか
- `any` の不要な使用がないか
- `Props` 型が定義されているか
- Next.js の組み込み型（`Metadata`, `PageProps` 等）を活用しているか

### 4. パフォーマンス

- 不必要な Client Component 化（JS バンドルの肥大化）
- 画像に `next/image` を使っているか
- リンクに `next/link` を使っているか
- 大きなコンポーネントの動的インポート（`dynamic()`）の検討

### 5. Vitest テスト（`*.test.ts` / `*.spec.ts`）

- テストが存在するか
- テストが意図した動作を検証しているか
- エッジケースのカバレッジ
- `happy-dom` 環境を前提とした適切なモック

### 6. セキュリティ

- 環境変数（`NEXT_PUBLIC_` 以外）がクライアントに露出していないか
- XSS リスク（`dangerouslySetInnerHTML` の不適切な使用）
- 入力バリデーション

### 7. コード品質

- 可読性（変数名・関数名・コンポーネント名）
- 重複コードの有無
- エラーハンドリング（`error.tsx`, try/catch）

## レビュー結果の報告フォーマット

### ✅ 良い点
- 適切な実装や優れた設計をリストアップ

### ⚠️ 改善提案
- 改善が推奨される点を、重要度と理由付きでリストアップ

### 🚨 重大な問題
- セキュリティ・バグ・Next.js の誤用など、修正必須の問題をリストアップ

### 💡 オプション提案
- 必須ではないが検討に値する改善案（パフォーマンス最適化など）

## 注意事項

- Next.js 16 / React 19 の最新ベストプラクティスに基づいてレビューする
- プロジェクトの技術スタック（Vitest 4, TypeScript, ESLint 9）を考慮する
- 問題の指摘に加え、具体的な修正例を提示する
