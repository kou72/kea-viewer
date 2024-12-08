# Kea Viewer

KEA DHCP サーバーのリース情報を表示する Web アプリケーション

## 機能

- DHCP リース情報のリアルタイム表示
- MAC アドレスごとの最新情報表示
- 自動更新機能

## システム要件

- Node.js
- NPM
- Bun
- PM2 (`npm install -g pm2`)
- KEA DHCP サーバー

## ディレクトリ構成

```
kea-viewer/
├── backend/           # バックエンドサーバー
├── frontend/          # フロントエンドアプリケーション
├── logs/             # ログファイル
├── ecosystem.config.js # PM2設定ファイル
└── kea-viewer.conf   # アプリケーション設定ファイル
```

## 設定

### kea-viewer.conf

```json
{
  "csvPath": "/var/lib/kea/kea-leases4.csv", // KEAリースファイルのパス
  "refreshInterval": 1, // 更新間隔（秒）
  "backendPort": 3001, // バックエンドポート
  "frontendPort": 3000 // フロントエンドポート
}
```

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/kou72/kea-viewer.git
cd kea-viewer

# フロントエンドの依存関係インストール
cd frontend
npm install
npm run build

# バックエンドの依存関係インストール
cd ../backend
bun install
```

## 起動方法

```bash
# PM2でサービスを起動
pm2 start ecosystem.config.js

# ステータス確認
pm2 status

# ログの確認
pm2 logs

# サービスの停止
pm2 stop all
```

## アクセス

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:3001/api/leases/v4

## ログ

- ログファイルは `logs/` ディレクトリに保存されます
- `pm2 logs` コマンドでリアルタイムログを確認できます

## 開発者向け情報

- バックエンド: Express.js + CSV Parser
- フロントエンド: Next.js + TailwindCSS
- プロセス管理: PM2

## トラブルシューティング

- ログファイルは `logs/` ディレクトリを確認
- PM2 のステータスは `pm2 status` で確認
- 設定ファイルのパスとポート番号を確認

## ライセンス

MIT License
