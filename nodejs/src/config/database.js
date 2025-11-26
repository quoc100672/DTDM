const { Pool } = require('pg');
require('dotenv').config();

// Kết nối PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Wrapper để tương thích với MySQL2 syntax
const promisePool = {
  query: async (text, params) => {
    const result = await pool.query(text, params);
    // Trả về format giống MySQL: [rows, fields]
    // Thêm properties để tương thích
    const rows = result.rows;
    rows.insertId = result.rows[0]?.id;
    rows.affectedRows = result.rowCount;
    rows.rowCount = result.rowCount;
    return [rows, result.fields];
  },
  end: () => pool.end()
};

module.exports = promisePool;