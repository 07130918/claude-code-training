# CLAUDE.md — example1

Next.js 16 のサンプルプロジェクト。Claude Code ハンズオン講習の実験場として使用する。

## 技術スタック

- **Next.js 16** — App Router + Turbopack（dev/build ともデフォルト）
- **React 19** — Server Components / Client Components
- **TypeScript 5**
- **ESLint 9** — `eslint-config-next` ベース
- **Vitest 4** — 単体テスト（happy-dom 環境）

## ディレクトリ構成

```
example1/
├── src/app/
│   ├── api/health/          # ヘルスチェック API + Vitest テスト
│   │   ├── route.ts         # GET /api/health
│   │   └── route.test.ts    # Vitest テスト
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # トップページ
├── next.config.ts
├── vitest.config.ts
└── package.json
```

## 開発コマンド

```bash
npm run dev          # 開発サーバー（http://localhost:3000）
npm run build        # プロダクションビルド
npm start            # プロダクションサーバー
npm run lint         # ESLint
npm run test         # Vitest（1回実行）
npm run test:watch   # Vitest（ウォッチモード）
npm run test:ui      # Vitest UI
npm run test:coverage # カバレッジレポート
```

## 開発時の注意点

- **Server Components がデフォルト** — クライアント機能が必要な場合のみ `"use client"` を付与する
- **API Route は `route.ts`** — `app/api/<path>/route.ts` に `GET`/`POST` 等をエクスポート
- **テストは Vitest** — Jest 互換の API。設定は [vitest.config.ts](vitest.config.ts) を参照
- **Turbopack** — `next dev` / `next build` ともに Turbopack がデフォルト（Next.js 16 安定化済み）
