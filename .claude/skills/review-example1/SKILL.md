---
name: review-example1
description: example1ディレクトリ（Next.js 16プロジェクト）のコードをレビューする。引数でファイル/ディレクトリを指定可能。App Router・Server Components・TypeScript・Vitest・ESLintの観点でチェックし、✅良い点 / ⚠️改善提案 / 🚨重大な問題 / 💡オプション提案 の4区分で日本語報告する。
allowed-tools: Read, Grep, Glob, Bash(npx eslint:*), Bash(npx tsc:*)
argument-hint: [対象ファイルまたはディレクトリ（省略時はexample1全体）]
---

# example1 コードレビュー

`example1/` ディレクトリ配下のNext.js 16プロジェクトをレビューする。

- `$ARGUMENTS` が指定されている場合: `example1/$ARGUMENTS` を対象にレビューする
- `$ARGUMENTS` が空の場合: `example1/` 全体を対象にレビューする

## レビュー対象

```
example1/
├── src/app/          # App Router（ページ・レイアウト・APIルート）
├── src/lib/          # 共有ライブラリ・型定義
├── vitest.config.ts  # テスト設定
├── next.config.ts    # Next.js設定
└── tsconfig.json     # TypeScript設定
```

## レビュー手順

1. **対象ファイルの読み込み**
   - 引数指定がある場合は `example1/$ARGUMENTS` を Read/Glob/Grep で確認
   - 引数なしの場合は `example1/src/` 配下を Glob で列挙してから Read

2. **Next.js 16 / App Router のベストプラクティス確認**
   - Server Components と Client Components の適切な使い分け（`"use client"` の必要性）
   - データフェッチの方法（fetch / Server Actions / Route Handlers）
   - `use cache` ディレクティブの活用有無
   - レイアウト（`layout.tsx`）とページ（`page.tsx`）の責務分離
   - メタデータ（`metadata` エクスポート）の設定

3. **TypeScript型の確認**
   - 適切な型定義（`src/lib/types.ts` との整合性）
   - `any` の不要な使用
   - 型安全性（Props・APIレスポンス・エラーハンドリング）

4. **コード品質チェック**
   - 可読性（変数名・関数名・コンポーネント名）
   - 責務の分離（ロジックとUIの分離）
   - 重複コードの有無
   - 不要な `console.log` や未使用インポート

5. **テスト（Vitest）の確認**
   - `route.test.ts` 等のテストカバレッジ
   - テストの質（正常系・異常系・エッジケース）
   - `happy-dom` 環境での適切なモック使用

6. **セキュリティチェック**
   - APIルートの入力バリデーション
   - 機密情報のハードコード（APIキー等）
   - 適切なHTTPステータスコードの返却
   - CORS・認証・認可の考慮

7. **パフォーマンス**
   - 不要なクライアントサイドレンダリング
   - 画像最適化（`next/image` の使用）
   - 不要な再レンダリング（React Compiler活用の余地）

## レビュー結果の報告フォーマット

### ✅ 良い点
- 適切な実装・設計をリストアップ

### ⚠️ 改善提案
- 改善が推奨される点を、重要度と理由付きでリストアップ

### 🚨 重大な問題
- セキュリティ・バグ・型エラーなど修正必須の問題をリストアップ

### 💡 オプション提案
- 必須ではないが検討に値する改善案（Next.js 16新機能の活用等）

## 注意事項

- Next.js 16 / React 19の最新ベストプラクティスを基準にする
- `example1/CLAUDE.md` の方針があれば優先的に参照する
- 問題の指摘だけでなく、具体的な修正例も提示する
