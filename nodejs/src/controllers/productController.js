const Product = require('../models/productModel');

class ProductController {
  // Hiển thị trang chủ
  static async showHomePage(req, res) {
    try {
      const products = await Product.getAll();
      res.render('index', { products, searchKeyword: '' });
    } catch (error) {
      res.status(500).send('Lỗi server: ' + error.message);
    }
  }

  // Tìm kiếm sản phẩm
  static async searchProducts(req, res) {
    try {
      const keyword = req.query.keyword || '';
      const products = keyword ? await Product.search(keyword) : await Product.getAll();
      res.render('index', { products, searchKeyword: keyword });
    } catch (error) {
      res.status(500).send('Lỗi tìm kiếm: ' + error.message);
    }
  }

  // Hiển thị form thêm sản phẩm
  static showAddForm(req, res) {
    res.render('add-product', { error: null });
  }

  // Thêm sản phẩm
  static async addProduct(req, res) {
    try {
      const { name, description, price, quantity } = req.body;
      
      if (!name || !price || !quantity) {
        return res.render('add-product', { 
          error: 'Vui lòng điền đầy đủ thông tin!' 
        });
      }

      await Product.create({ name, description, price, quantity });
      res.redirect('/');
    } catch (error) {
      res.render('add-product', { error: 'Lỗi thêm sản phẩm: ' + error.message });
    }
  }

  // Hiển thị form sửa sản phẩm
  static async showEditForm(req, res) {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).send('Không tìm thấy sản phẩm');
      }
      res.render('edit-product', { product, error: null });
    } catch (error) {
      res.status(500).send('Lỗi: ' + error.message);
    }
  }

  // Cập nhật sản phẩm
  static async updateProduct(req, res) {
    try {
      const { name, description, price, quantity } = req.body;
      const id = req.params.id;

      if (!name || !price || !quantity) {
        const product = await Product.getById(id);
        return res.render('edit-product', { 
          product, 
          error: 'Vui lòng điền đầy đủ thông tin!' 
        });
      }

      await Product.update(id, { name, description, price, quantity });
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Lỗi cập nhật: ' + error.message);
    }
  }

  // Xóa sản phẩm
  static async deleteProduct(req, res) {
    try {
      await Product.delete(req.params.id);
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Lỗi xóa sản phẩm: ' + error.message);
    }
  }
}

module.exports = ProductController;