-- Tạo database (không cần nếu Render tự tạo)
-- CREATE DATABASE product_db;

-- Kết nối database
\c product_db;

-- Xóa bảng nếu đã tồn tại
DROP TABLE IF EXISTS products;

-- Tạo bảng products (PostgreSQL syntax)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo index
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_created_at ON products(created_at);

-- Tạo trigger để tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE
    ON products FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

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

-- Kiểm tra dữ liệu
SELECT * FROM products;

-- Kiểm tra cấu trúc bảng
\d products;
