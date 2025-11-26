-- ============================================
-- SQL SCRIPT CHO RENDER.COM MYSQL
-- ============================================
-- Lưu ý: Render đã tự động tạo database
-- Chỉ cần chạy script này để tạo bảng và dữ liệu
-- ============================================

-- Xóa bảng nếu đã tồn tại
DROP TABLE IF EXISTS products;

-- Tạo bảng products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm dữ liệu mẫu
INSERT INTO products (name, description, price, quantity) VALUES
('Laptop Dell XPS 13', 'Laptop cao cấp với chip Intel Core i7 thế hệ 12, RAM 16GB, SSD 512GB', 25000000, 10),
('iPhone 15 Pro Max', 'Điện thoại Apple mới nhất với chip A17 Pro, camera 48MP', 35000000, 15),
('Samsung Galaxy S24 Ultra', 'Flagship Samsung 2024 với bút S-Pen, màn hình Dynamic AMOLED', 28000000, 20),
('MacBook Pro M3', 'Laptop Apple với chip M3, màn hình Retina 14 inch', 42000000, 8),
('iPad Pro 12.9', 'Máy tính bảng cao cấp với chip M2, hỗ trợ Apple Pencil', 30000000, 12),
('Sony WH-1000XM5', 'Tai nghe chống ồn cao cấp, thời lượng pin 30 giờ', 8500000, 25),
('Canon EOS R6', 'Máy ảnh mirrorless full-frame 20MP, quay video 4K 60fps', 58000000, 5),
('Nintendo Switch OLED', 'Máy chơi game cầm tay với màn hình OLED 7 inch', 9500000, 30),
('Dyson V15 Detect', 'Máy hút bụi không dây với công nghệ laser phát hiện bụi', 18000000, 7),
('Apple Watch Series 9', 'Đồng hồ thông minh với chip S9, màn hình Always-On', 12000000, 18);

-- Kiểm tra dữ liệu đã thêm
SELECT COUNT(*) as total_products FROM products;

-- Hiển thị 5 sản phẩm đầu tiên
SELECT id, name, price, quantity FROM products LIMIT 5;
