# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# リント
npm run lint

# テスト（全件）
npm test

# テスト（ウォッチモード）
npm run test:watch

# テスト（UIモード）
npm run test:ui

# カバレッジ計測
npm run test:coverage
```

特定のテストファイルのみ実行:

```bash
npx vitest run src/app/api/health/route.test.ts
```

## アーキテクチャ

### App Router 構造

`src/app/` 配下が Next.js 16 App Router のルート。ページは Server Components がデフォルトで、`"use client"` を付けた場合のみ Client Component になる。

API ルートは `src/app/api/<name>/route.ts` に配置し、`GET` / `POST` などの名前付きエクスポートで HTTP メソッドに対応する。

### 共通型定義

`src/lib/types.ts` に API レスポンスの共通型（`ApiSuccessResponse<T>` / `ApiErrorResponse` / `ApiResponse<T>`）と各エンドポイント固有の型をまとめている。新しい API を追加する際はここに型を定義してから実装する。

### テスト戦略

Vitest（happy-dom 環境）を使用。API ルートハンドラは Next.js サーバーを起動せずに直接インポートして単体テストできる。カバレッジ対象は `src/app/api/**/*.ts`（テストファイル除く）。

`@` エイリアスは `src/` に解決される（vitest.config.ts と tsconfig.json の両方で設定済み）。
