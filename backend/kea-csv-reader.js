import express from 'express';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

const app = express();

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && origin.match(/:3000$/)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// CSVファイルを読み取る関数
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

// DHCPv4リース情報
app.get('/api/leases/v4', (req, res) => {
  readLeaseFile('/var/lib/kea/kea-leases4.csv', res);
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Kea Viewer Server running at http://0.0.0.0:3001');
});