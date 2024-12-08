import express from "express";
import { parse } from "csv-parse";
import { createReadStream, readFileSync } from "fs";
import { join } from "path";

// 設定ファイルの読み込み
const config = JSON.parse(readFileSync(join("..", "kea-viewer.conf"), "utf8"));

const app = express();

// CORSの設定（シンプルに全てのオリジンを許可）
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// バックエンドの設定のみを返す
app.get("/api/config", (req, res) => {
  res.json({
    refreshInterval: config.refreshInterval,
    csvPath: config.csvPath,
  });
});

const readLeaseFile = (filepath, res) => {
  const parser = parse({ columns: true }, (err, records) => {
    if (err) {
      res.status(500).json({ error: `Failed to parse ${filepath}` });
      return;
    }
    res.json(records);
  });
  createReadStream(filepath).pipe(parser);
};

app.get("/api/leases/v4", (req, res) => {
  readLeaseFile(config.csvPath, res);
});

app.listen(config.backendPort, "0.0.0.0", () => {
  console.log(`Kea Viewer Server running at http://0.0.0.0:${config.backendPort}`);
});
