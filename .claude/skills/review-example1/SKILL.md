---
name: review-example1
description: example1/ ディレクトリ配下 (Next.js 16 + React 19 + TypeScript + Vitest) のコードを専門的にレビューする。App Router 構造・Server/Client Components 境界・Turbopack 設定・Vitest テスト・TypeScript 型・セキュリティを観点に、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。example1 配下のレビュー、Next.js プロジェクトのレビュー、ヘルスチェック API のレビュー依頼時に使う。
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(ls:*), Bash(find:*), Read, Grep, Glob
argument-hint: [example1配下の対象ファイル/サブディレクトリ (省略時は example1/ 全体)]
---

# example1 コードレビュー

`example1/` ディレクトリ配下 (Next.js 16 + React 19 + TypeScript + Vitest) のコードを専門的にレビューする。

- `$ARGUMENTS` が指定されている場合: `example1/` 配下の該当ファイル/サブディレクトリを対象にレビューする
- `$ARGUMENTS` が空の場合: `example1/` 全体 (src/, テスト, 設定ファイル) を対象にする

## 前提となる技術スタック

- **Next.js 16** (App Router, Turbopack デフォルト)
- **React 19** (Server Components がデフォルト, `"use client"` で Client Components)
- **TypeScript** (strict 推奨)
- **Vitest 4** (happy-dom 環境)
- **ESLint 9**

## レビュー手順

1. **対象の把握**
   - `ls example1/` でディレクトリ構造を確認
   - `git status` / `git diff -- example1/` で変更点を確認
   - 引数指定がある場合は対象を直接 Read/Grep
   - `example1/package.json`・`next.config.ts`・`tsconfig.json`・`vitest.config.ts` で設定を把握

2. **Next.js 16 観点**
   - **App Router 構造** (`src/app/`): `page.tsx`・`layout.tsx`・`route.ts` の配置と命名が正しいか
   - **Server / Client Components 境界**: `"use client"` が必要最小限か (不要な箇所に付いていないか / 必要な箇所で欠落していないか)
   - **データ取得**: Server Components での fetch / `cache` / `revalidate` の使い方が適切か
   - **Route Handlers** (`route.ts`): HTTP メソッドのエクスポート (`GET`/`POST` 等)・`Response`/`NextResponse` の使い分け
   - **Turbopack**: `package.json` の scripts に古い `--turbopack` フラグが残っていないか (Next.js 16 ではデフォルト)
   - **環境変数**: クライアントで参照する変数に `NEXT_PUBLIC_` プレフィックスが付いているか, 機密情報が `NEXT_PUBLIC_` に紛れていないか
   - **メタデータ / SEO**: `metadata` エクスポートや `generateMetadata` の使い方

3. **React 19 観点**
   - フックの依存配列の正しさ
   - 不要な `useState` / `useEffect` (Server Components で代替可能なケース)
   - `key` プロパティの適切な指定
   - イベントハンドラの命名 / メモ化の必要性

4. **TypeScript 観点**
   - `any` の不要な使用がないか
   - API レスポンス型 (例: ヘルスチェック API) が定義され、ハンドラと一致しているか
   - `tsconfig.json` の `strict` が有効か
   - 型推論で十分な箇所に冗長な型注釈がないか

5. **Vitest テスト観点**
   - `vitest.config.ts` の環境 (`happy-dom`) が用途に合っているか
   - API ルート (`src/app/api/health/` 等) に対するテストが存在するか
   - AAA (Arrange / Act / Got / Assert) で構造化されているか
   - モックが過剰でないか (実装の置き換えではなく境界のみモック)
   - エッジケース (異常系・空入力・境界値) のカバレッジ
   - `coverage/` ディレクトリの結果と比較し、未カバー箇所を指摘

6. **セキュリティ観点**
   - APIキー・トークン・パスワードのハードコードがないか
   - `.env*` ファイルが `.gitignore` 対象になっているか
   - API ルートでの入力バリデーション (zod 等の利用検討)
   - SSRF / オープンリダイレクト / XSS の余地
   - `NEXT_PUBLIC_` に機密情報が含まれていないか

7. **コード品質**
   - 可読性 (変数名 / 関数名 / コメントの過不足)
   - 関数の長さ・責務の分離
   - 重複コード
   - エラーハンドリング (try/catch の妥当性, ユーザーへの情報漏洩)
   - 不要な `console.log` の残存

8. **設定ファイル**
   - `next.config.ts`: 不要な設定や非推奨オプションがないか
   - `eslint.config.mjs`: ルールが Next.js 推奨に沿っているか
   - `package.json`: 依存バージョン (React 19 / Next.js 16 / Vitest 4 の整合性)

## レビュー結果の報告フォーマット

### ✅ 良い点
- Next.js 16 / React 19 / Vitest のベストプラクティスに沿っている点を具体的に挙げる

### ⚠️ 改善提案
- 重要度 (高 / 中 / 低) と理由を付けて改善案を提示
- ファイル名と行番号を `path:line` 形式で引用

### 🚨 重大な問題
- セキュリティ・型安全性・実行時バグなど、修正必須の問題
- 該当箇所と再現条件・想定される影響を明記

### 💡 オプション提案
- 必須ではないが検討に値する設計改善・テスト追加・パフォーマンス改善

## 注意事項

- レビュー対象は **`example1/` 配下に限定**する (他のディレクトリには言及しない)
- 建設的で具体的なフィードバックを心がけ、必ず解決策とコード例を添える
- コードスタイルよりロジック・セキュリティ・型安全性を優先する
- プロジェクト直下の `CLAUDE.md` と `example1/CLAUDE.md` のコンテキストを尊重する
- Next.js 16 のドキュメントを引用する場合は context7 MCP (`/vercel/next.js`) を利用する
- 出力は日本語
