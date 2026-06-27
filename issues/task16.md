# Task16: /ndb-renewalの変更をPull Request化し、Claude Codeでセルフレビューする

## 目的

Task13からTask15で行った `/ndb-renewal` の実装、品質改善、CLAUDE.md / Skill整備の変更を、実務に近い形でPull Requestとして整理する。

Claude Codeを使って、変更差分の確認、PR本文の作成、セルフレビュー、修正対応までを体験します。

このタスクは時間が余った人向けの発展課題です。

## 所要時間

約20-30分

## 前提条件

- Task13が完了していること
- 可能であればTask14とTask15も完了していること
- 自分のForkリポジトリで作業していること
- `git status` と `git diff` の基本を理解していること
- GitHub上でPull Requestを作成できること
- Task12で `origin` が自分のFork、`upstream` が本家リポジトリになっていること

## このタスクで学ぶこと

- 実装差分をClaude Codeに説明させる方法
- PR本文をAIと一緒に作成する方法
- セルフレビューの観点を整理する方法
- レビュー前に自分で品質確認する習慣
- AIが出したレビュー指摘を人間が取捨選択する方法
- CI結果を確認し、必要に応じて修正する流れ

## ミッション

`/ndb-renewal` に関する変更をPull Requestとして提出できる状態にしてください。

PRを作成する前に、Claude Codeで差分を確認し、PR本文とセルフレビューコメントを作成します。

## 注意点

- いきなりPRを作成せず、まず差分を確認してください
- PR本文をClaude Codeに丸投げせず、内容を自分で確認してください
- 実際にはやっていない作業を書かないでください
- 架空の成果、数字、実績、取引先、制度を書かないでください
- CIが失敗した場合は、Claude Codeに原因を説明させてから修正してください
- レビュー指摘をすべて採用する必要はありません
- 変更範囲が大きくなりすぎた場合は、今回のPRに含めるものと含めないものを整理してください

## 実装の進め方

### ステップ1: 現在の差分を確認する

```bash
git status --short --branch
git diff --stat
git diff
```

Claude Codeに依頼:

```text
Task16を進めます。

まず現在の変更差分を確認してください。
まだcommitやpushはしないでください。

以下を説明してください。

1. 変更されたファイル一覧
2. それぞれの変更目的
3. Task13, Task14, Task15のどれに対応する変更か
4. PRに含めてよい変更か
5. 不要そうな変更や確認が必要な変更があるか
```

### ステップ2: PR用ブランチか確認する

すでに作業ブランチにいる場合は、現在のブランチ名を確認します。

```bash
git branch --show-current
```

まだ `main` にいる場合は、PR用ブランチを作成します。

```bash
git switch -c feature/ndb-renewal
```

Claude Codeに依頼:

```text
現在のブランチ名と変更差分を確認し、
このままPR用ブランチとして使ってよいか説明してください。

問題がある場合は、安全な対応案を出してください。
まだブランチ作成や変更はしないでください。
```

### ステップ3: lint / testを実行する

```bash
cd example1
npm run lint
npm run test
```

失敗した場合は、Claude Codeに依頼:

```text
lintまたはtestが失敗しました。
まず原因を初心者向けに説明してください。
その後、最小限の修正案を提案してください。
まだ修正はしないでください。
```

### ステップ4: commit messageを決める

このタスクでは、commit messageは `プレフィックス: 日本語の要約` の形式にします。

例:

```text
feat: ndb-renewalページを追加
fix: ndb-renewalの見出し構造を修正
docs: ndb-renewalのレビュー観点を追加
```

Claude Codeに依頼:

```text
今回の変更に適したcommit messageを提案してください。

条件:
- `プレフィックス: 日本語の要約` の形式にする
- 変更内容が分かる
- 大げさすぎない
- 1行にする

まだcommitはしないでください。
```

### ステップ5: commitする

差分を確認してから、必要なファイルだけを明示的にstageします。

```bash
git status --short
git add <変更したファイル>
git commit -m "<commit message>"
```

`git add .` は不要なファイルを含める可能性があるため、慣れていないうちは避けてください。

### ステップ6: 自分のForkへpushする

Task12のremote構成どおり、push先は自分のForkである `origin` です。

```bash
git push -u origin <branch-name>
```

### ステップ7: PR本文を作成する

Claude Codeに依頼:

```text
今回の変更差分をもとに、Pull Request本文を作成してください。

以下の形式にしてください。

## 概要

## 変更内容

## 確認したこと

## レビューしてほしい観点

## 備考

注意:
- 実際にやっていないことは書かないでください
- 架空の成果や数字を追加しないでください
- ジュニアエンジニアにも伝わる簡潔な文章にしてください
```

PR本文の例:

```markdown
## 概要

日本デェイブレイク株式会社の現行コーポレートサイトを参考に、研修用の改善モックページ `/ndb-renewal` を追加しました。

既存サイトのソースコードは使用せず、公開情報を参考にしたNext.js上のモックとして実装しています。

## 変更内容

- `/ndb-renewal` ページを追加
- ヒーロー、サービス紹介、会社の特徴、採用向けセクション、News、お問い合わせ導線を実装
- レスポンシブ表示とアクセシビリティ観点を確認
- ページ表示に関するテストを追加
- 必要に応じて `CLAUDE.md` またはSkillを更新

## 確認したこと

- [ ] `/ndb-renewal` が表示できる
- [ ] スマートフォン幅で大きく崩れない
- [ ] `npm run lint` が通る
- [ ] `npm run test` が通る
- [ ] 架空の数字、実績、取引先、制度を追加していない

## レビューしてほしい観点

- 会社情報の扱いが安全か
- コンポーネント分割が読みやすいか
- アクセシビリティやレスポンシブ対応に問題がないか
- テスト観点が不足していないか

## 備考

このページは研修用モックであり、本番サイトの置き換えではありません。
```

### ステップ8: Pull Requestを作成する

GitHubの画面、またはGitHub CLIでPRを作成します。

PRの向きは以下にしてください。

```text
base repository: 07130918/claude-code-training
base branch: main
head repository: 自分のFork
head branch: 作業ブランチ
```

GitHub CLIを使う場合:

```bash
gh pr create --repo 07130918/claude-code-training --base main --head <your-username>:<branch-name> --title "<PR title>" --body-file <body-file>
```

### ステップ9: CI結果を確認する

PRを作成したら、GitHub Actionsの結果を確認します。

GitHub CLIを使う場合:

```bash
gh pr checks
```

CIが失敗した場合は、Claude Codeに依頼:

```text
PRのCIが失敗しました。
まず失敗しているジョブと原因を初心者向けに説明してください。
その後、最小限の修正案を提案してください。
まだ修正はしないでください。
```

### ステップ10: Claude Codeでセルフレビューする

PRを提出する前、または提出直後にセルフレビューします。

Claude Codeに依頼:

```text
このPRをセルフレビューしてください。

観点:
1. PRの目的が明確か
2. 差分が大きすぎないか
3. 会社情報として不正確な表現がないか
4. テスト・lintの確認が十分か
5. レビューしてほしい観点がPR本文に書かれているか
6. 不要なファイルが含まれていないか

High / Medium / Low に分けて指摘してください。
まだ修正はしないでください。
```

### ステップ11: High指摘だけを修正する

Claude Codeに依頼:

```text
セルフレビュー結果のうち、重要度Highの指摘だけ修正してください。

修正後、どのファイルをどう変更したか説明してください。
```

必要に応じて追加commitを作り、再度pushします。

## 完了条件

- [ ] 現在の変更差分をClaude Codeに説明させている
- [ ] PR用ブランチで作業している
- [ ] `npm run lint` が通る
- [ ] `npm run test` が通る
- [ ] 変更内容に合ったcommit messageでcommitしている
- [ ] 自分のForkへpushしている
- [ ] PR本文を作成している
- [ ] Pull Requestを作成している
- [ ] CI結果を確認している
- [ ] Claude Codeでセルフレビューしている
- [ ] 重要度Highの指摘を必要に応じて修正している
- [ ] PRの内容を自分の言葉で説明できる

## 振り返り

最後に、以下を確認してください。

1. PR本文を作る前に差分を確認したことで、何が書きやすくなったか
2. Claude Codeのセルフレビュー指摘のうち、人間が判断すべきものは何か
3. CIが失敗した場合、原因説明と修正を分けることにどんな意味があるか
4. 自分の業務でPRを出す時、Claude Codeに任せたい部分と自分で確認すべき部分は何か
