# HƯỚNG DẪN TẠO DATABASE - BƯỚC 6

## Mục Lục
1. [Tạo database Local](#1-tạo-database-local)
2. [Tạo database trên Railway](#2-tạo-database-trên-railway)
3. [Sử dụng script tự động](#3-sử-dụng-script-tự-động)

---

## 1. TẠO DATABASE LOCAL

### Cách 1: Sử dụng MySQL Workbench

**Bước 1:** Mở MySQL Workbench

**Bước 2:** Tạo kết nối mới
- Click vào biểu tượng "+" bên cạnh "MySQL Connections"
- Nhập thông tin:
  ```
  Connection Name: Local MySQL
  Hostname: localhost
  Port: 3306
  Username: root
  Password: [password của bạn hoặc để trống]
  ```
- Click "Test Connection" → "OK"

**Bước 3:** Mở kết nối vừa tạo

**Bước 4:** Chạy file SQL
- Menu: File → Open SQL Script
- Chọn file: `database.sql`
- Click biểu tượng ⚡ (Execute) hoặc Ctrl+Shift+Enter
- Đợi script chạy xong

**Bước 5:** Kiểm tra kết quả
```sql
USE product_db;
SELECT * FROM products;
```

Bạn sẽ thấy 10 sản phẩm mẫu.

---

### Cách 2: Sử dụng Command Line

**Bước 1:** Mở PowerShell hoặc Command Prompt

**Bước 2:** Đăng nhập MySQL
```bash
mysql -u root -p
```

**Bước 3:** Chạy file SQL
```bash
source D:/9.cong_viec_tren_lop/DTDM/nodejs/database.sql
```

Hoặc copy paste nội dung file `database.sql` vào console.

**Bước 4:** Kiểm tra
```sql
USE product_db;
SELECT * FROM products;
```

---

### Cách 3: Sử dụng phpMyAdmin

**Bước 1:** Mở phpMyAdmin (thường là http://localhost/phpmyadmin)

**Bước 2:** Click tab "SQL"

**Bước 3:** Copy toàn bộ nội dung file `database.sql` và paste vào

**Bước 4:** Click "Go" để thực thi

**Bước 5:** Kiểm tra database `product_db` đã được tạo

---

## 2. TẠO DATABASE TRÊN RAILWAY

### Cách 1: Sử dụng Railway CLI (Khuyên dùng)

**Bước 1:** Cài đặt Railway CLI
```bash
npm install -g @railway/cli
```

**Bước 2:** Đăng nhập Railway
```bash
railway login
```

**Bước 3:** Liên kết với project
```bash
cd D:/9.cong_viec_tren_lop/DTDM/nodejs
railway link
```

**Bước 4:** Kết nối MySQL
```bash
railway connect mysql
```

**Bước 5:** Sau khi vào MySQL shell, copy paste nội dung file `database.sql`

**Bước 6:** Kiểm tra
```sql
USE railway;  -- Railway tự đặt tên database là "railway"
SELECT * FROM products;
```

---

### Cách 2: Kết nối từ MySQL Workbench

**Bước 1:** Lấy thông tin kết nối từ Railway
- Đăng nhập railway.app
- Vào Project của bạn
- Click vào MySQL service
- Tab "Connect"
- Copy các thông tin:
  - MYSQL_HOST
  - MYSQL_PORT
  - MYSQL_USER
  - MYSQL_PASSWORD
  - MYSQL_DATABASE

**Bước 2:** Tạo kết nối mới trong MySQL Workbench
```
Connection Name: Railway MySQL
Hostname: [MYSQL_HOST từ Railway]
Port: [MYSQL_PORT từ Railway]
Username: [MYSQL_USER từ Railway]
Password: [MYSQL_PASSWORD từ Railway]
```

**Bước 3:** Test Connection → OK

**Bước 4:** Mở kết nối và chạy file `database.sql`

**Lưu ý:** Sửa dòng đầu trong `database.sql`:
```sql
-- Thay vì:
USE product_db;

-- Sử dụng:
USE railway;  -- hoặc tên database của Railway
```

---

### Cách 3: Sử dụng Railway Web Terminal

**Bước 1:** Trong Railway Dashboard
- Click vào MySQL service
- Click "..." → "View Logs"

**Bước 2:** Sử dụng Query tab để chạy SQL commands

---

## 3. SỬ DỤNG SCRIPT TỰ ĐỘNG

Cách này tự động tạo database và bảng, hoạt động trên cả Local và Railway.

**Bước 1:** Đảm bảo file `.env` có đầy đủ thông tin
```env
DB_HOST=localhost          # hoặc Railway host
DB_USER=root              # hoặc Railway user
DB_PASSWORD=              # điền password
DB_NAME=product_db        # hoặc railway
DB_PORT=3306              # hoặc Railway port
PORT=3000
```

**Bước 2:** Chạy script setup
```bash
npm run setup-db
```

**Bước 3:** Xem kết quả
```
✓ Đã kết nối MySQL server
✓ Đã tạo database: product_db
✓ Đã xóa bảng cũ (nếu có)
✓ Đã tạo bảng products
✓ Đã thêm 10 sản phẩm mẫu
✓ Tổng số sản phẩm trong database: 10
✅ HOÀN THÀNH! Database đã sẵn sàng sử dụng.
✓ Đã đóng kết nối MySQL
```

---

## 4. KIỂM TRA DATABASE ĐÃ TẠO THÀNH CÔNG

### Kiểm tra cấu trúc bảng:
```sql
DESCRIBE products;
```

Kết quả:
```
+-------------+---------------+------+-----+-------------------+
| Field       | Type          | Null | Key | Default           |
+-------------+---------------+------+-----+-------------------+
| id          | int           | NO   | PRI | NULL              |
| name        | varchar(255)  | NO   |     | NULL              |
| description | text          | YES  |     | NULL              |
| price       | decimal(10,2) | NO   |     | NULL              |
| quantity    | int           | NO   |     | 0                 |
| created_at  | timestamp     | YES  |     | CURRENT_TIMESTAMP |
| updated_at  | timestamp     | YES  |     | CURRENT_TIMESTAMP |
+-------------+---------------+------+-----+-------------------+
```

### Kiểm tra dữ liệu:
```sql
SELECT id, name, price, quantity FROM products;
```

### Kiểm tra kết nối từ Node.js:
```bash
npm start
```

Truy cập http://localhost:3000 để xem danh sách sản phẩm.

---

## 5. XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: Access denied for user 'root'@'localhost'
**Giải pháp:**
- Kiểm tra password trong file `.env`
- Reset password MySQL nếu cần

### Lỗi: Can't connect to MySQL server
**Giải pháp:**
- Kiểm tra MySQL service đã chạy chưa
- Kiểm tra port 3306 có bị chiếm không
- Kiểm tra firewall

### Lỗi: Database already exists
**Giải pháp:**
- Xóa database cũ: `DROP DATABASE product_db;`
- Hoặc chạy lại script, nó sẽ tự xóa và tạo mới

### Lỗi: Table 'products' already exists
**Giải pháp:**
- Script đã có lệnh `DROP TABLE IF EXISTS products`
- Chạy lại script là được

---

## 6. TỔNG KẾT

✅ Đã tạo file `database.sql` với cấu trúc đầy đủ
✅ Đã tạo script tự động `setup-database.js`
✅ Đã thêm 10 sản phẩm mẫu để test
✅ Hỗ trợ cả Local và Railway

**Khuyến nghị:**
- Development (Local): Dùng **Cách 3 - Script tự động** (`npm run setup-db`)
- Production (Railway): Dùng **Cách 1 - Railway CLI**

Tiếp theo: **BƯỚC 7 - TRIỂN KHAI LÊN RAILWAY** 🚀
