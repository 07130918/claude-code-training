# CLAUDE.md

このファイルは、example1 ディレクトリで作業する際の Claude Code 向けガイドラインです。
親ディレクトリの [../CLAUDE.md](../CLAUDE.md)（プロジェクト全体方針）と、ユーザのグローバル設定（`~/.claude/CLAUDE.md`）も併せて参照してください。

## プロジェクト概要

`claude-code-training` ハンズオン用の Next.js 16 サンプルプロジェクト。
App Router + TypeScript + Vitest 構成で、Skills / サブエージェント / CI/CD の練習台として使う。

## 技術スタック

- **Next.js 16**（App Router、`next dev` / `next build` ともに Turbopack デフォルト）
- **React 19**（Server Components 中心、必要なら `"use client"` で Client Components）
- **TypeScript 5**（`strict: true`、パスエイリアス `@/* → ./src/*`）
- **ESLint 9**（`eslint-config-next` の core-web-vitals + typescript プリセット）
- **Vitest 4**（`happy-dom` 環境、`@vitest/coverage-v8`、`globals: true`）

## ディレクトリ構成

```
example1/
├── src/
│   ├── app/
│   │   ├── api/health/
│   │   │   ├── route.ts          # GET /api/health
│   │   │   └── route.test.ts     # Vitest テスト
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   └── globals.css
│   └── lib/
│       └── types.ts              # ApiResponse / HealthCheckResponse 等の共有型
├── public/
├── vitest.config.ts
├── next.config.ts
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## 開発コマンド

すべて `example1/` 配下で実行する。

```bash
# 開発サーバー（Turbopack）
npm run dev

# 本番ビルド
npm run build

# 本番起動
npm start

# Lint
npm run lint

# テスト
npm run test            # 1回実行（CI 相当）
npm run test:watch      # 変更を監視
npm run test:ui         # Vitest UI
npm run test:coverage   # カバレッジ計測
```

開発サーバー起動後は [http://localhost:3000](http://localhost:3000) を開く。
ヘルスチェックは `GET http://localhost:3000/api/health` で確認できる。

## コーディング規約

### Server / Client Components の使い分け

- ✅ デフォルトは Server Component（`"use client"` を付けない）
- ✅ Client Component が必要なケース: `useState` / `useEffect` / `onClick` などのブラウザ API
- ❌ Server Component に React フックを書かない

### 型定義

- ✅ 共有型は [src/lib/types.ts](src/lib/types.ts) にまとめる
- ✅ API レスポンスは `ApiResponse<T>` / `HealthCheckResponse` などの既存型を流用する
- ❌ `any` を使わない（`unknown` で受けて型ガードを書く）

### パスエイリアス

- ✅ `@/lib/types` のようにエイリアス経由で import する
- ❌ `../../lib/types` のような相対パスをまたがって書かない

### テスト（Vitest）

- ✅ `src/app/api/**/*.ts` がカバレッジ対象（[vitest.config.ts](vitest.config.ts) 参照）
- ✅ `globals: true` のため `describe` / `it` / `expect` は import 不要
- ✅ `happy-dom` 環境で動くので DOM API も使える
- ❌ `__mocks__` ディレクトリではなく `vi.mock()` を使う

## API ルート実装パターン

`src/app/api/health/route.ts` を参考にする。

```ts
import { NextResponse } from "next/server";
import type { HealthCheckResponse } from "@/lib/types";

export async function GET() {
  const response: HealthCheckResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(response, { status: 200 });
}
```

- ✅ 戻り値の型を `src/lib/types.ts` に定義してから実装する
- ✅ `NextResponse.json()` でステータスコードを明示する
- ❌ 生の `Response` オブジェクトを直接組み立てない

## 注意点

- ⚠️ Turbopack 利用時にキャッシュが壊れたら `.next/` を削除して再起動する
- ⚠️ `coverage/` と `.next/` は生成物。コミットしない（`.gitignore` 済み）
- ⚠️ 依存追加時は `npm install <pkg>` で `package-lock.json` を更新する

## 関連ドキュメント

- プロジェクト全体方針: [../CLAUDE.md](../CLAUDE.md)
- ハンズオンタスク: [../issues/](../issues/)
- プロジェクト README: [README.md](README.md)
