# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# 開発サーバー起動（Turbopack）
npm run dev

# 本番ビルド
npm run build

# Lint
npm run lint

# テスト（1回実行）
npm run test

# テスト（ウォッチモード）
npm run test:watch

# カバレッジ計測
npm run test:coverage
```

特定のテストファイルを実行する場合:

```bash
npx vitest run src/app/api/health/route.test.ts
```

## アーキテクチャ

Next.js 16 App Router + TypeScript 5 の構成。テストには Vitest（happy-dom 環境）を使用しており、Next.js のテストランナーとは独立している。

### パスエイリアス

`@/` は `src/` にマップされている（`tsconfig.json` および `vitest.config.ts` の両方で設定済み）。

### 型定義

`src/lib/types.ts` に共有型を集約する。API レスポンス型は `ApiSuccessResponse<T>` / `ApiErrorResponse` / `ApiResponse<T>` の union パターンを使用。新しい API エンドポイントを追加する際は、レスポンス型をここに定義する。

### API ルート

`src/app/api/<endpoint>/route.ts` に配置する Next.js Route Handler。テストファイルは同ディレクトリの `route.test.ts` に置く。テストは Next.js サーバーを起動せず、Route Handler 関数を直接インポートして実行する（`vitest.config.ts` の `alias` で `@/` を解決）。

### カバレッジ対象

`vitest.config.ts` の設定により、カバレッジは `src/app/api/**/*.ts`（テストファイルを除く）のみを対象とする。
