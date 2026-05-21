---
name: review-example1
description: example1ディレクトリ（Next.js 16 / TypeScript / Vitest / ESLint）のコードをレビューする。App Router・Server/Client Components・Route Handler・型定義・テスト・Lintの観点で検査し、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。
allowed-tools: Bash(npm run lint:*), Bash(npm run test:*), Bash(npx vitest*), Read, Grep, Glob
argument-hint: [対象ファイルまたはディレクトリ（省略時は example1 全体）]
---

# example1 コードレビュー

`example1` ディレクトリ（Next.js 16 + TypeScript + Vitest）のコードをレビューする。

- `$ARGUMENTS` が指定されている場合: そのファイル/ディレクトリをレビュー対象にする
- `$ARGUMENTS` が空の場合: `example1/src/` 配下を全体レビューする

## レビュー手順

### 1. 対象コードの読み込み

```
対象: example1/src/app/**/*.{ts,tsx}
      example1/src/lib/**/*.ts
      example1/src/**/*.test.ts
```

- Glob で対象ファイルを列挙し、Read で内容を確認する
- `$ARGUMENTS` 指定がある場合はそのパスのみ対象

### 2. Next.js 16 / App Router チェック

- **Server Components**: `"use client"` なしのコンポーネントがデフォルトでサーバー側で実行されることを前提に実装しているか
- **Client Components**: `"use client"` が必要な箇所（useState / useEffect / イベントハンドラ等）に適切に付与されているか
- **Route Handlers** (`src/app/api/**/route.ts`):
  - `GET` / `POST` 等のハンドラ関数が正しくエクスポートされているか
  - `NextRequest` / `NextResponse` を適切に使用しているか
  - エラーレスポンスに統一した型 (`ApiErrorResponse`) を使っているか
- **ファイル配置**: `page.tsx` / `layout.tsx` / `route.ts` が App Router の規約通りか

### 3. TypeScript / 型定義チェック

- `src/lib/types.ts` の共有型 (`ApiSuccessResponse<T>` / `ApiErrorResponse` / `ApiResponse<T>`) を活用しているか
- `any` の不要な使用がないか
- 関数の引数・戻り値に型が付いているか
- 新しい API レスポンス型を `src/lib/types.ts` に集約しているか

### 4. テストチェック（Vitest）

- `src/app/api/**/*.test.ts` がルートハンドラと同ディレクトリに存在するか
- Route Handler を直接インポートしてテストしているか（Next.js サーバー不要の単体テスト）
- `@/` エイリアスを正しく使用しているか
- 正常系・異常系のテストケースが揃っているか

### 5. Lint の実行

`example1` ディレクトリで以下を実行し、エラー・警告を確認する:

```bash
cd example1 && npm run lint
```

### 6. テストの実行

```bash
cd example1 && npm run test
```

テスト失敗がある場合は内容を詳しく報告する。

### 7. コード品質チェック

- 可読性（変数名・関数名・コメント）
- 関数の長さ・責務の分離
- 重複コードの有無
- エラーハンドリングの適切性（try/catch, エラーレスポンス）

### 8. セキュリティチェック

- APIキー・シークレットのハードコードがないか
- 入力値のバリデーション
- XSS 等の脆弱性

## レビュー結果の報告フォーマット

### ✅ 良い点
- 良い実装や改善点をリストアップ

### ⚠️ 改善提案
- 改善が推奨される点を、重要度と理由付きでリストアップ

### 🚨 重大な問題
- セキュリティやバグなど、修正必須の問題をリストアップ

### 💡 オプション提案
- 必須ではないが検討に値する改善案

## 注意事項

- 建設的で具体的なフィードバックを提供する
- 問題を指摘するだけでなく、解決策も提案する
- Next.js 16 の App Router・Turbopack・React 19 を前提にしたアドバイスをする
- `example1/CLAUDE.md` のアーキテクチャ方針を考慮する
