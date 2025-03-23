# Yomikata Quiz

「Yomikata Quiz」は漫画のコマ内にある単語や技名のルビを当てるクイズゲームです。ユーザーが登録したマイリストに登録されたクイズを順番に解いていく形式になっています。

## 概要

このアプリケーションでは、以下のことができます：

- クイズの作成と閲覧
- マイリストの作成と管理
- 出版社、作者、雑誌などでクイズを検索
- ユーザープロフィールの管理

## 技術スタック

### フロントエンド
- Next.js 15.0.3
- React 19.0.0
- TypeScript
- Tailwind CSS
- React Hook Form + Zod（フォームバリデーション）

### バックエンド
- Ruby 3.3.6
- Ruby on Rails 7.1.5
- PostgreSQL 14
- Devise Token Auth（認証）
- Active Storage（画像管理）

### インフラ
- Docker / Docker Compose

## 開発環境のセットアップ

### 前提条件
- Docker と Docker Compose がインストールされていること

### 起動手順

1. リポジトリをクローン
```
git clone [リポジトリURL]
cd hunter_type
```

2. Docker コンテナを起動
```
docker compose up -d
```

3. アクセス
   - フロントエンド: http://localhost:3000
   - バックエンドAPI: http://localhost:8000

## 主な機能

### クイズ一覧
作成されたマイリストを一覧表示します。

### クイズを作る
クイズを作成し、マイリストに紐づけます。マイリスト名と説明を入力し、最低3つのクイズを登録します。
クイズの形式：
1. 画像
2. 問題
3. 答え
4. 解説

### クイズを探す
出版社、作者、雑誌などで絞り込んでクイズを検索できます。

### ユーザー機能
- プロフィール表示・編集
- マイリスト管理
- 作成したクイズの管理

## データモデル

- **User**: ユーザー情報
- **Publisher**: 出版社
- **Magazine**: 雑誌（出版社に属する）
- **Author**: 作者
- **Comic**: 漫画（作者と雑誌に属する）
- **Quiz**: クイズ（漫画に属する）
- **Mylist**: マイリスト（ユーザーが作成）
- **MylistQuiz**: マイリストとクイズの中間テーブル

## 開発者向け情報

### ディレクトリ構成

```
hunter_type/
├── backend/         # Rails APIサーバー
├── frontend/        # Next.jsフロントエンド
├── docker/          # Dockerファイル
└── docker-compose.yml
```

### APIエンドポイント

バックエンドは以下のようなAPIエンドポイントを提供しています：

- 認証関連: `/auth/*`
- クイズ関連: `/api/v1/quizzes/*`
- マイリスト関連: `/api/v1/mylists/*`
- 出版社関連: `/api/v1/publishers/*`
- 雑誌関連: `/api/v1/magazines/*`
- 作者関連: `/api/v1/authors/*`
- 漫画関連: `/api/v1/comics/*`

## ライセンス

[ライセンス情報]
MIT