# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Claude Codeのハンズオン講習用トレーニングプロジェクト。以下の構成でClaude Codeの機能を段階的に学習する。

## 研修進行ルール

IMPORTANT: このリポジトリは研修用であり、Claude Codeがissueの内容を読んで受講者の理解確認なしに実装を進めることを禁止する。

Claude Codeは、issueやtaskファイルを扱う時に以下の順序を守る。

1. まずissueの目的、前提条件、完了条件を日本語で要約する
2. 変更対象ファイル、実装ステップ、確認方法を提示する
3. 受講者が理解しているか確認する
4. 受講者または講師が「実装してよい」「進めてください」など明示的に許可するまで、ファイル変更、依存関係追加、コミット、PR作成を行わない
5. 実装は小さなステップに分け、各ステップの前後で何を学ぶための作業か説明する
6. 受講者の理解が曖昧な場合は、実装を止めて説明、質問、選択肢の提示を優先する

例外は、ユーザーが明示的に「このタスクを実装して」「PRを作成して」など作業実行を依頼した場合のみ。この場合も、研修の文脈を保ち、変更内容と学習ポイントを簡潔に説明する。

## プロジェクト構造

```
claude-code-training/
├── .claude/                          # Claude Code設定
│   ├── agents/                      # サブエージェント
│   │   ├── nextjs-reviewer.md       # Next.jsレビュー専門
│   │   └── performance-optimizer.md # パフォーマンス分析
│   ├── skills/                      # Skills（公式推奨形式のカスタム拡張）
│   │   └── review-custom/SKILL.md   # コードレビュー用 skill
│   └── settings.local.json          # WebSearch等の権限設定
├── example1/                         # Next.js 16 サンプルプロジェクト
│   ├── src/app/                     # App Router
│   │   └── api/health/              # ヘルスチェックAPI + Vitestテスト
│   ├── vitest.config.ts             # Vitest設定
│   └── package.json
├── homework/                         # 宿題・課題ファイル
│   └── note.txt
└── issues/                          # 学習タスク（task1.md〜task13.md）
```

## 開発コマンド

### example1プロジェクト（Next.js）

```bash
# 開発サーバー起動
cd example1
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リント
npm run lint
```

### ハンズオン進行

issuesディレクトリのタスクを順番に実行する:

1. **task1.md** - Claude Codeのインストール
2. **task2.md** - プロジェクトでClaude Codeをアクティベート（CLAUDE.md作成）
3. **task3.md** - WebSearch機能を有効化
4. **task4.md** - WebSearchを使ってNext.jsを理解
5. **task5.md** - Skill 作成
6. **task6.md** - サブエージェント作成
7. **task7.md** - ペアプログラミング（総合演習：新機能実装）
8. **task8-a.md** - GitHub Fork と push 先のセットアップ
9. **task8.md** - BiomeとGitHub Actions CIの導入
10. **task9.md** - Vitestでヘルスチェックappの単体テストを書く
11. **task10.md** - CI/CD統合（テスト・ビルドの並列化と手動トリガー）
12. **task11.md** - Skills（発展）
13. **task12.md** - 本家リポジトリの最新タスクをForkへ反映する
14. **task13.md** - コーポレートサイト改善モックを実装する

## アーキテクチャ

### example1（Next.jsプロジェクト）

- **Next.js 16** - App Router + Turbopack（dev/buildともデフォルトで利用）
- **React 19** - Server Components / Client Components
- **TypeScript** - 型安全性
- **ESLint 9** - コード品質
- **Vitest 4** - 単体テストフレームワーク（happy-dom環境）

### 主要な学習目標

1. **Skills**: `.claude/skills/<name>/SKILL.md` に配置し、frontmatter で発火条件・ツール権限を制御（公式は `commands` より skills を推奨）
2. **サブエージェント**: `.claude/agents/`に配置し、専門的なレビューやタスクを自律実行
3. **WebSearch**: Next.js等の最新情報取得
4. **CI/CD**: GitHub Actionsでフォーマット・リント・テストを自動化

## 重要な設定ファイル

### `.claude/settings.local.json`

WebSearchやGit関連Bashコマンドの権限を付与済み。必要に応じて他のツール権限を追加する。

### `.claude/skills/review-custom/SKILL.md`

コードレビュー用 skill（公式推奨の skills 形式）。`/review-custom` または該当文脈で自動起動し、以下を観点にチェック:

- コード品質（可読性、構造、重複）
- ベストプラクティス
- セキュリティ（機密情報、脆弱性）
- TypeScript型定義
- テストの必要性
- ドキュメント

`argument-hint` 対応により、引数で対象ファイル/ディレクトリを指定可能。引数なしの場合は未コミットの変更が対象。

### `.claude/agents/`

- `nextjs-reviewer.md` - Next.js 16のベストプラクティスに沿ってレビューする専門エージェント
- `performance-optimizer.md` - Next.jsアプリケーションのパフォーマンスを分析・最適化提案するエージェント

## 開発時の注意点

### Next.js 16の特徴

- **App Router**: `example1/src/app/`配下がルート構造
- **Turbopack**: `next dev`/`next build`ともTurbopackがデフォルト（Next.js 16安定化）
- **Server Components**: デフォルトでサーバーコンポーネント
- **Client Components**: `"use client"`ディレクティブで明示

### Skills/サブエージェント作成時

- **Skills**: シンプルな指示のショートカット〜中規模の手順を frontmatter 付きで管理。`allowed-tools`・`argument-hint`・`disable-model-invocation` などのメタが指定可
- **サブエージェント**: 複雑な自律タスク・専門分析向け（`.claude/agents/<name>.md`）
- 両者ともMarkdown形式（`.md`）
- Git管理してチームで共有推奨
- 本プロジェクトでは旧 `.claude/commands/` 形式は廃止し、すべて `.claude/skills/<name>/SKILL.md` に統一済み（公式推奨）

## このプロジェクトでの作業方針

1. **issuesのタスクを順次進める**: task1から順に実行し、Claude Codeの機能を習得
2. **example1で実験**: Next.jsプロジェクトを使って新機能やレビューを試す
3. **Skills/エージェントを活用**: 効率的なワークフロー構築

## 出力言語

**日本語で出力すること** - ユーザーへの全ての説明、レビュー結果、コメントは日本語で記述する
