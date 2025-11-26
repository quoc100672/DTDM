const db = require('../config/database');

class Product {
  // Lấy tất cả sản phẩm
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  }

  // Tìm kiếm sản phẩm
  static async search(keyword) {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $2',
      [`%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }

  // Lấy sản phẩm theo ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  }

  // Thêm sản phẩm mới
  static async create(productData) {
    const { name, description, price, quantity } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, description, price, quantity]
    );
    return result[0].id;
  }

  // Cập nhật sản phẩm
  static async update(id, productData) {
    const { name, description, price, quantity } = productData;
    const [result] = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5',
      [name, description, price, quantity, id]
    );
    return result.rowCount;
  }

  // Xóa sản phẩm
  static async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount;
  }
}

module.exports = Product;