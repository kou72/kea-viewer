import express from "express";
import { parse } from "csv-parse";
import { createReadStream, readFileSync } from "fs";
import { join } from "path";

// 設定ファイルの読み込み
const config = JSON.parse(readFileSync(join("..", "kea-viewer.conf"), "utf8"));
const csvPath = config.csvPath;
const backendPort = config.backendPort;
const backendIp = config.backendIp;

const app = express();

// CORSの設定（シンプルに全てのオリジンを許可）
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
  readLeaseFile(csvPath, res);
});

app.listen(backendPort, backendIp, () => {
  console.log(`Kea Viewer Server running at http://${backendIp}:${backendPort}`);
});
