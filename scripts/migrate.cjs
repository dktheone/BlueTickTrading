const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.join(process.cwd(), 'data', 'leads.db');
const sqlPath = path.join(process.cwd(), 'src', 'lib', 'schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

const db = new DatabaseSync(dbPath);
db.exec(sql);
console.log('✅ Stage 3 Schema Migration executed successfully!');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
console.log('Total tables in leads.db:', tables.length);
tables.forEach((t, i) => console.log((i + 1) + '. ' + t.name));
