# example1 — Next.js 16 ハンズオン用プロジェクト

`claude-code-training` のハンズオンで使用する Next.js プロジェクトです。`create-next-app` を雛形に、App Router・TypeScript・Vitest を組み合わせて構築しています。

## 技術スタック

- **Next.js 16**（App Router / Turbopack デフォルト）
- **React 19**
- **TypeScript 5**
- **ESLint 9**（`eslint-config-next`）
- **Vitest 4**（happy-dom 環境、`@vitest/coverage-v8`）

## ディレクトリ構成

```
example1/
├── src/
│   ├── app/
│   │   ├── api/health/        # ヘルスチェックAPI（route.ts）とそのテスト
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   └── globals.css
│   └── lib/
│       └── types.ts           # 共有型定義（HealthCheckResponse 等）
├── public/
├── vitest.config.ts
├── next.config.ts
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## 開発コマンド

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
npm run test            # 1回実行
npm run test:watch      # 変更を監視
npm run test:ui         # Vitest UI
npm run test:coverage   # カバレッジ計測
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、トップページが表示されます。`GET /api/health` でヘルスチェックエンドポイントを呼び出せます。

## ハンズオンでの使い方

`../issues/task1.md` から順に進めると、このプロジェクト上で Claude Code の以下を体験できます。

- Skills（`.claude/skills/<name>/SKILL.md`）
- サブエージェント（`.claude/agents/`）
- Biome による高速フォーマッタ＋リンタ
- Vitest による単体テスト
- GitHub Actions による CI/CD

## 参考

- [Next.js 16 リリースノート](https://nextjs.org/blog/next-16)
- [Vitest ドキュメント](https://vitest.dev/)
- [Claude Code ドキュメント](https://code.claude.com/docs/en/overview)
