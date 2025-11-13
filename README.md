# MUFC Score

マンチェスター・ユナイテッドのファン向けWebアプリケーション。試合予定、結果、順位表、チーム情報などを提供します。

## 機能

- **ホームページ**: チーム概要、次の試合、最新結果、リーグ順位
- **試合予定**: 今後の試合スケジュール
- **試合結果**: 過去の試合結果と詳細
- **順位表**: プレミアリーグ全体の順位表
- **チーム情報**: 選手一覧とプロフィール
- **試合詳細**: 個別試合の詳細情報

## 技術スタック

- **Next.js 15** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **SWR** - データフェッチングとキャッシング
- **Football-Data API** - サッカーデータの取得

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. APIキーの取得

1. [Football-Data.org](https://www.football-data.org/client/register) でアカウントを作成
2. APIキーを取得

### 3. 環境変数の設定

`.env.local`ファイルをプロジェクトルートに作成し、APIキーを設定:

```env
NEXT_PUBLIC_FOOTBALL_API_KEY=your_api_key_here
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ビルドとデプロイ

### プロダクションビルド

```bash
npm run build
npm start
```

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数 `NEXT_PUBLIC_FOOTBALL_API_KEY` を設定
4. デプロイ

## プロジェクト構造

```
mufc_score/
├── app/                    # Next.js App Router
│   ├── fixtures/          # 試合予定ページ
│   ├── results/           # 試合結果ページ
│   ├── standings/         # 順位表ページ
│   ├── squad/             # チーム情報ページ
│   ├── match/[id]/        # 試合詳細ページ
│   ├── layout.tsx         # 共通レイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── match/            # 試合関連コンポーネント
│   ├── team/             # チーム関連コンポーネント
│   └── ui/               # 共通UIコンポーネント
├── lib/                   # ユーティリティとAPI
│   ├── api.ts            # API関数
│   ├── hooks.ts          # カスタムフック
│   ├── constants.ts      # 定数
│   └── utils.ts          # ユーティリティ関数
├── types/                 # TypeScript型定義
│   └── football.ts
└── public/               # 静的ファイル
```

## APIレート制限

Football-Data APIの無料プランは以下の制限があります:

- **10リクエスト/分**
- トップリーグへのアクセスは永久無料

このアプリはSWRを使用してデータをキャッシュし、APIリクエストを最小限に抑えます。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 免責事項

このサイトはマンチェスター・ユナイテッドFCの非公式ファンサイトです。データはFootball-Data APIより取得しています。

## クレジット

- データ提供: [Football-Data.org](https://www.football-data.org)
- アイコン: [Lucide Icons](https://lucide.dev)
