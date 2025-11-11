import "dotenv/config";
import express from "express";
import cors from "cors";
import { getPool } from "./db.js";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const REQUIRED = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME"];
for (const k of REQUIRED) {
  if (!process.env[k]) console.warn(`[env] Missing ${k}`);
}

const pool = await getPool(process.env);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "server", time: new Date().toISOString() });
});

app.get("/api/db/health", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [[v]] = await conn.query("SELECT VERSION() AS version");
      const [[t]] = await conn.query("SELECT NOW() AS serverTime");
      const [tables] = await conn.query("SHOW TABLES FROM ??", [
        process.env.DB_NAME,
      ]);
      res.json({
        ok: true,
        db: process.env.DB_NAME,
        version: v.version,
        serverTime: t.serverTime,
        tables: tables.slice(0, 5), // first few table names only
      });
    } finally {
      conn.release();
    }
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

app.get("/api/districts", async (req, res) => {
  try {
    const limit = Math.max(
      1,
      Math.min(50, parseInt(req.query.limit || "8", 10))
    );
    const [rows] = await pool.query(
      "SELECT districtId, name, website FROM school_districts ORDER BY name LIMIT ?",
      [limit]
    );
    res.json({ ok: true, rows });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
