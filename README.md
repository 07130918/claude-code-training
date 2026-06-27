# Claude Code ハンズオン講習

Google Drive: https://drive.google.com/drive/u/0/folders/1TTjjPxaxpWVQcHk8Qdmn3dpyZFfi7bfU

**AIと一緒にコードを書く新しい開発体験**

---

## 本日のゴール

1. Claude Codeの基本操作をマスターする
2. プロジェクト固有の設定方法を理解する
3. 効率的な開発ワークフローを構築する

---

## 研修でのClaude Code利用ルール

このリポジトリは、Claude Codeに作業を丸投げするためではなく、受講者がClaude Codeを使った開発プロセスを理解するための研修用リポジトリです。

Claude Codeにissueの内容を読ませる時は、すぐに実装へ進めず、次の順番で進めてください。

1. issueの目的と完了条件を要約させる
2. 受講者が内容を理解しているか確認する
3. 変更対象ファイルと実装ステップだけを説明させる
4. 講師または受講者が「実装してよい」と明示してから実装させる
5. 実装後は変更内容、確認方法、次に学ぶべき点を説明させる

Claude Codeへの依頼では、以下のように明示してください。

```text
まず実装しないでください。
issueの内容を読み、目的、完了条件、変更対象、実装ステップを説明してください。
私が理解して「進めてください」と言うまで、ファイル変更はしないでください。
```

---

## 🤖 Claude Codeとは？

**AnthropicによるAIペアプログラミングツール**

- ターミナルで動作するCLIツール（VS Code/JetBrains拡張、デスクトップアプリ、`claude.ai/code` のWeb版もある）
- Claude 4世代のモデルを利用（Claude Code のデフォルトは Sonnet 4.6、最も高度なタスクには Opus 4.7 を選択可能）
- プロジェクト全体のコンテキストを理解
- 自律的なタスク実行が可能

### できること

| 機能                       | 説明                         |
| -------------------------- | ---------------------------- |
| 🎨 **コード生成**           | 機能説明からコードを自動生成 |
| 🐛 **デバッグ**             | バグの発見と修正提案         |
| 🗺️ **コードナビゲーション** | 大規模コードベースの理解     |
| ⚡ **自動化**               | 繰り返し作業の効率化         |

---

## 🆚 従来のツールとの違い

| 特徴             | 従来のツール | Claude Code                    |
| ---------------- | ------------ | ------------------------------ |
| 動作場所         | エディタ内   | ターミナル                     |
| コンテキスト理解 | 限定的       | プロジェクト全体               |
| カスタマイズ     | 難しい       | 容易（コマンド・エージェント） |
| 自律性           | 低い         | 高い（サブエージェント）       |

---

## 📁 プロジェクト構成

```
claude-code-training/
├── .claude/                       # Claude Code設定
│   ├── agents/                    # サブエージェント定義
│   │   ├── nextjs-reviewer.md
│   │   └── performance-optimizer.md
│   ├── skills/                    # Skills（frontmatter付きカスタム拡張）
│   │   └── review-custom/SKILL.md # コードレビュー skill
│   └── settings.local.json        # WebSearch等の権限設定
├── CLAUDE.md                       # プロジェクトメモリ
├── example1/                       # Next.js 16 サンプルプロジェクト
├── homework/                       # 宿題・課題ファイル
│   └── note.txt
├── issues/                         # タスクファイル（順番に実行）
│   ├── task1.md   # Claude Codeのインストール
│   ├── task2.md   # プロジェクト初期化（CLAUDE.md）
│   ├── task3.md   # WebSearch設定
│   ├── task4.md   # WebSearchでNext.jsを理解
│   ├── task5.md   # Skill 作成
│   ├── task6.md   # サブエージェント作成
│   ├── task7.md   # ペアプログラミング（新機能実装）
│   ├── task8-a.md # GitHub Fork と push 先のセットアップ
│   ├── task8.md   # BiomeとGitHub Actions CI
│   ├── task9.md   # Vitestで単体テスト
│   ├── task10.md  # CI/CD統合（テスト自動実行と手動トリガー）
│   ├── task11.md  # Skills（発展）
│   ├── task12.md  # 本家リポジトリの最新タスクをForkへ反映
│   └── task13.md  # コーポレートサイト改善モック
└── README.md                       # このファイル
```

---
