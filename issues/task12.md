# Task12: 本家リポジトリの最新タスクをForkへ反映する

## 目的

講師が追加したTask12以降の教材を、各受講者のForkリポジトリへ取り込める状態にする。

このタスクでは、標準的なGitHub Fork運用と同じく、自分のForkリポジトリを `origin`、本家リポジトリ(講師リポジトリ)を `upstream` として扱います。

## 所要時間

約10-15分

## 前提条件

- Task 1-11が完了していること
- 自分のGitHubアカウントにこのリポジトリをForkしていること
- ローカルにFork済みリポジトリをcloneしていること
- `git remote -v` の意味をおおまかに理解していること

## このタスクで学ぶこと

- Git remoteの向き先を確認する方法
- 本家リポジトリの最新内容を取得する方法
- 取得した最新教材を自分のForkへ反映する方法
- 受講者ごとにローカルの実装状態が違っても、教材更新を取り込む進め方

## ミッション

本家リポジトリ [07130918/claude-code-training](https://github.com/07130918/claude-code-training) を `upstream` として最新内容を取得し、自分のForkリポジトリである `origin` へ反映してください。

この作業により、講師が追加したTask12以降の教材を各自のForkに取り込めます。その後の実装状態は受講者ごとに違っていて構いません。

## remote名のルール

このタスクでは、以下のremote名に揃えます。

```text
origin   = 自分のForkリポジトリ https://github.com/<your-username>/claude-code-training.git
upstream = 本家リポジトリ https://github.com/07130918/claude-code-training.git
```

Task 8-aと同じremote名です。`upstream` から講師が追加した教材を取得し、`origin` へpushして自分のForkを更新します。

## 注意点

- 受講者によって、ローカルやForkの状態は違っていて構いません
- 作業中の変更がある場合は、先にcommitするかstashしてください
- conflictが出た場合は、Claude Codeに内容を説明させてから解決してください
- いきなり `reset --hard` やforce pushを使わないでください
- `upstream` は本家リポジトリから取得するためのremoteです。push先は自分のForkである `origin` です
- Claude Codeに任せる場合も、remote名とpush先を必ず確認してから実行してください

## 実装の進め方

### ステップ1: 現在の状態を確認する

```bash
git status --short --branch
git remote -v
```

作業中の変更が表示された場合は、先にcommitまたはstashします。

Claude Codeに相談する場合:

```text
まず実行しないでください。
git status と git remote -v の結果を見て、現在のremote構成と作業中の変更有無を説明してください。
```

### ステップ2: remote名を確認する

Task 8-aの手順どおりに進めている場合、多くの受講者は以下の状態になっています。

```text
origin   = 自分のFork
upstream = 本家リポジトリ(講師リポジトリ)
```

確認します。

```bash
git remote -v
```

期待する状態:

```text
origin    https://github.com/<your-username>/claude-code-training.git (fetch)
origin    https://github.com/<your-username>/claude-code-training.git (push)
upstream  https://github.com/07130918/claude-code-training.git (fetch)
upstream  https://github.com/07130918/claude-code-training.git (push)
```

`upstream` が未設定の場合は追加します。

```bash
git remote add upstream https://github.com/07130918/claude-code-training.git
```

`origin` が自分のForkではなく本家リポジトリを指している場合は、Claude Codeまたは講師に確認してからremoteを修正してください。

### ステップ3: 本家リポジトリの最新を取得する

```bash
git fetch upstream
```

`main` に切り替えます。

```bash
git switch main
```

本家リポジトリの最新を取り込みます。

```bash
git merge upstream/main
```

conflictが出た場合は、Claude Codeに以下のように依頼してください。

```text
merge conflictが出ました。
まだ解決しないでください。
どのファイルで何が衝突しているか、初心者向けに説明してください。
その後、解決方針を提案してください。
```

### ステップ4: 自分のForkへ反映する

本家リポジトリの最新内容を取り込めたら、自分のForkである `origin` へpushします。

```bash
git push origin main
```

GitHubで自分のForkを開き、最新のtaskファイルが反映されているか確認してください。

### ステップ5: 確認する

```bash
git log --oneline --decorate -5
git remote -v
```

確認ポイント:

- `origin` が自分のForkを指している
- `upstream` が `07130918/claude-code-training` を指している
- `main` に本家リポジトリの最新commitが入っている
- 自分のForkにも最新のtaskファイルが反映されている

## Claude Codeへの依頼例

```text
Task12を進めます。

この研修では、自分のForkを origin、本家リポジトリ(講師リポジトリ)を upstream として扱います。
まず実行せず、以下を確認してください。

1. 現在のgit remote構成
2. 作業中の変更有無
3. upstreamが本家リポジトリを指しているか
4. upstreamの最新を取得してoriginへ反映する手順

私が理解して「進めてください」と言うまで、コマンドは実行しないでください。
```

## 完了条件

- [ ] `git remote -v` で `origin` が自分のForkを指している
- [ ] `git remote -v` で `upstream` が本家リポジトリを指している
- [ ] `git fetch upstream` が成功している
- [ ] `git merge upstream/main` が完了している
- [ ] `git push origin main` が成功している
- [ ] 自分のForkに最新のtaskファイルが反映されている

## 次のステップ

最新教材の取り込みが完了したら、[task13.md](./task13.md) に進んで、コーポレートサイト改善モックの実装フローを学びましょう。
