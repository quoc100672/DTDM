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
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
      [`%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }

  // Lấy sản phẩm theo ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  // Thêm sản phẩm mới
  static async create(productData) {
    const { name, description, price, quantity } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
      [name, description, price, quantity]
    );
    return result.insertId;
  }

  // Cập nhật sản phẩm
  static async update(id, productData) {
    const { name, description, price, quantity } = productData;
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?',
      [name, description, price, quantity, id]
    );
    return result.affectedRows;
  }

  // Xóa sản phẩm
  static async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Product;