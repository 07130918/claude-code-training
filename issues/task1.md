# Task 1: Claude Codeのインストール

## 目的
Claude Codeをあなたのマシンにインストールし、使用できる状態にする

## 所要時間
約5分

## 前提条件
特になし（ただし、NPMでインストールする場合はNode.js 18以上が必要）

## 手順

### 1. Claude Codeのインストール

お使いのOSに応じて、以下のいずれかの方法でインストールしてください：

#### macOS/Linux（推奨）

**Homebrewを使用：**
```bash
brew install --cask claude-code
```

**curlを使用：**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

#### Windows

**PowerShellを使用：**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**CMDを使用：**
```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

#### NPMを使用（すべてのOS）

Node.js 18以上がインストールされている場合：

```bash
npm install -g @anthropic-ai/claude-code
```

または、pnpmを使用している場合：

```bash
pnpm add -g @anthropic-ai/claude-code
```

### 2. インストールの確認

以下のコマンドでインストールが成功したか確認します：

```bash
claude --version
```

バージョン番号が表示されればインストール成功です！

### 3. Claude Codeの起動と初回ログイン

以下のコマンドでClaude Codeを起動します：

```bash
claude
```

初回起動時は、ログインが求められます。

### 4. ログイン方法

初回起動時、以下のいずれかのアカウントでログインするよう促されます：

- **Claude.aiアカウント** - 無料で使用可能
- **Claude Consoleアカウント** - Anthropic APIを使用する場合

画面の指示に従ってログインを完了してください。認証情報は自動的に保存され、次回以降は自動ログインされます。

### 5. 使い方を確認

ログイン後、`/help`コマンドを実行すると、利用可能なコマンド一覧が表示されます：

```
/help
```

## 確認事項

- [ ] `claude --version`でバージョンが表示される
- [ ] `claude`コマンドでClaude Codeが起動する
- [ ] ログインが成功している
- [ ] `/help`コマンドでヘルプが表示される

## 次のステップ

✅ インストールが完了したら、[task2.md](./task2.md)に進んでプロジェクトでの初期化を学びましょう！

## トラブルシューティング

### `command not found: claude`と表示される場合

**NPMでインストールした場合:**
- npmのグローバルインストールパスが通っているか確認してください
- `npm config get prefix`で確認できます
- シェルを再起動してみてください

**他の方法でインストールした場合:**
- ターミナル/コマンドプロンプトを再起動してください
- インストールスクリプトが正常に完了したか確認してください

### ログインがうまくいかない場合
- インターネット接続を確認してください
- Claude.aiまたはClaude Consoleアカウントが有効か確認してください
- ブラウザで認証ページが開かない場合は、表示されたURLを手動でコピー＆ペーストしてください

### インストール方法の選択について
- **Homebrew（macOS/Linux）**: 最もシンプルで推奨
- **curl/PowerShell**: Homebrewがない環境向け
- **NPM**: Node.js環境がある場合、またはプロジェクトごとに管理したい場合
