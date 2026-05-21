# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

```bash
npm run dev          # 開発サーバー起動（Turbopack）
npm run build        # 本番ビルド（Turbopack）
npm start            # 本番サーバー起動
npm run lint         # ESLint実行

npm run test         # テスト1回実行
npm run test:watch   # テスト監視モード
npm run test:ui      # Vitest UI（ブラウザ）
npm run test:coverage # カバレッジ計測
```

特定テストファイルだけ実行する場合:

```bash
npx vitest run src/app/api/health/route.test.ts
```

## アーキテクチャ

### ルーティング（App Router）

`src/app/` 配下がルート構造。APIルートは `route.ts` ファイルで定義し、ディレクトリ名がパスになる（例: `src/app/api/health/route.ts` → `GET /api/health`）。

### テスト配置

テストファイルはソースと同じディレクトリに配置（コロケーション）。`route.test.ts` は `route.ts` の隣に置く。Vitest は happy-dom 環境で動作し、グローバル API（`describe`, `it`, `expect`）が使用可能。

カバレッジ対象は `src/app/api/**/*.ts`（テストファイルを除く）。

### 型定義

共通型は `src/lib/types.ts` に集約。パスエイリアス `@/*` → `./src/*` が利用可能。

### Next.js 16 の注意点

- `src/app/` 配下のコンポーネントはデフォルトで Server Components
- Client Components は `"use client"` ディレクティブを先頭に記述
- Turbopack は `next dev` / `next build` の両方でデフォルト有効
