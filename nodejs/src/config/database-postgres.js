const { Pool } = require('pg');
require('dotenv').config();

// Kết nối PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'product_db',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Wrapper để tương thích với MySQL2
const promisePool = {
  query: async (text, params) => {
    const result = await pool.query(text, params);
    // Format giống MySQL: trả về [rows, fields]
    return [result.rows, result.fields];
  },
  end: () => pool.end()
};

module.exports = promisePool;
