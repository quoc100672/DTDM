# 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN RENDER.COM

## ⚠️ LƯU Ý QUAN TRỌNG
**Render.com CHỈ hỗ trợ PostgreSQL miễn phí, KHÔNG hỗ trợ MySQL free.**

Bạn có 2 lựa chọn:
1. **Dùng PostgreSQL trên Render** (FREE) - Khuyên dùng
2. **Dùng MySQL external** (PlanetScale, Railway, Aiven)

---

## PHƯƠNG ÁN 1: DÙNG POSTGRESQL (KHUYÊN DÙNG)

### BƯỚC 1: Push Code lên GitHub

```bash
cd D:\9.cong_viec_tren_lop\DTDM
git add .
git commit -m "Add Render deployment files"
git push origin main
```

### BƯỚC 2: Tạo tài khoản Render

1. Truy cập: https://render.com
2. Click "Get Started for Free"
3. Chọn "Sign up with GitHub"
4. Authorize Render truy cập GitHub

### BƯỚC 3: Tạo PostgreSQL Database

1. **Dashboard → New → PostgreSQL**
2. **Cấu hình:**
   ```
   Name: product-postgres
   Database: product_db
   Region: Singapore
   Instance Type: Free
   ```
3. Click **"Create Database"**
4. Đợi 2-3 phút để khởi tạo

5. **Lấy thông tin kết nối:**
   - Click vào database vừa tạo
   - Tab "Info" → Copy **Internal Database URL**
   - Format: `postgresql://user:pass@host:port/dbname`

### BƯỚC 4: Import Database Schema

**Cách 1: Dùng Render PSQL Console (Dễ nhất)**

1. Trong PostgreSQL database page
2. Click tab "Shell" hoặc "PSQL"
3. Copy toàn bộ nội dung file `database-postgres.sql`
4. Paste vào console
5. Nhấn Enter

**Cách 2: Dùng External Connection**

```bash
# Cài psql client (nếu chưa có)
# Windows: choco install postgresql
# Mac: brew install postgresql

# Kết nối (dùng External Database URL)
psql "postgresql://user:pass@host:port/dbname"

# Import SQL
\i D:/9.cong_viec_tren_lop/DTDM/nodejs/database-postgres.sql

# Kiểm tra
SELECT * FROM products;
\q
```

**Cách 3: Dùng pgAdmin**

1. Download pgAdmin: https://www.pgadmin.org/download/
2. Add New Server:
   - Host: [từ External URL]
   - Port: [từ External URL]
   - Database: product_db
   - Username: [từ External URL]
   - Password: [từ External URL]
3. Tools → Query Tool
4. Paste nội dung `database-postgres.sql`
5. Execute (F5)

### BƯỚC 5: Deploy Web Service

1. **Dashboard → New → Web Service**

2. **Connect Repository:**
   - Chọn "Build and deploy from a Git repository"
   - Click "Connect" bên cạnh `quoc100672/DTDM`

3. **Cấu hình:**
   ```
   Name: nodejs-product-app
   Region: Singapore
   Branch: main
   Root Directory: nodejs
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Environment Variables** (click "Advanced"):
   
   **Cách 1: Dùng DATABASE_URL (Đơn giản)**
   ```
   DATABASE_URL = [Internal Database URL từ PostgreSQL]
   NODE_ENV = production
   ```

   **Cách 2: Dùng từng biến riêng**
   ```
   DB_HOST = [host từ PostgreSQL Internal URL]
   DB_PORT = 5432
   DB_USER = [user từ PostgreSQL]
   DB_PASSWORD = [password từ PostgreSQL]
   DB_NAME = product_db
   NODE_ENV = production
   ```

5. Click **"Create Web Service"**

6. **Đợi deploy** (3-5 phút):
   - Render sẽ clone code
   - Chạy `npm install`
   - Chạy `npm start`
   - Xem tiến trình trong tab "Logs"

### BƯỚC 6: Cập nhật Code để dùng PostgreSQL

Cần sửa file `src/config/database.js`:

**File gốc (MySQL):**
```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({...});
```

**File mới (PostgreSQL):**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Wrapper để tương thích
const promisePool = {
  query: async (text, params) => {
    const result = await pool.query(text, params);
    return [result.rows, result.fields];
  }
};

module.exports = promisePool;
```

**Hoặc dùng file đã tạo sẵn:**
```javascript
// Trong server.js hoặc app.js
const db = require('./src/config/database-postgres');
```

### BƯỚC 7: Test ứng dụng

1. Sau khi deploy xong, Render sẽ cung cấp URL:
   ```
   https://nodejs-product-app.onrender.com
   ```

2. Truy cập và test:
   - ✅ Xem danh sách sản phẩm
   - ✅ Thêm sản phẩm mới
   - ✅ Sửa sản phẩm
   - ✅ Xóa sản phẩm
   - ✅ Tìm kiếm

3. **Lưu ý Free Tier:**
   - App sẽ sleep sau 15 phút không hoạt động
   - Khởi động lại mất ~30 giây khi có request mới
   - PostgreSQL: 256MB RAM, 1GB storage

---

## PHƯƠNG ÁN 2: GIỮ MYSQL (DÙNG EXTERNAL DATABASE)

Nếu muốn giữ MySQL, dùng MySQL hosting bên ngoài:

### Option A: PlanetScale (Khuyên dùng)

1. **Đăng ký:** https://planetscale.com
2. **Free tier:** 5GB storage, 1 billion reads/month
3. **Tạo database:**
   - New Database → Name: product_db
   - Region: AWS us-east-1 (gần Singapore)
4. **Get connection string:**
   - Connect → Node.js → Copy connection info
5. **Import schema:**
   - Console → Paste SQL từ `database.sql`
6. **Cấu hình Render:**
   ```
   DB_HOST = [từ PlanetScale]
   DB_PORT = 3306
   DB_USER = [từ PlanetScale]
   DB_PASSWORD = [từ PlanetScale]
   DB_NAME = product_db
   ```

### Option B: Railway.app

1. **Đăng ký:** https://railway.app
2. **New Project → MySQL**
3. **Lấy connection info** từ Variables
4. **Import schema** bằng Railway CLI hoặc MySQL Workbench
5. **Cấu hình Render** với thông tin từ Railway

### Option C: Aiven

1. **Đăng ký:** https://aiven.io
2. **Free trial:** MySQL 1GB
3. **Create service → MySQL**
4. **Download CA cert** nếu cần SSL
5. **Cấu hình Render**

---

## CẬP NHẬT CODE SAU KHI DEPLOY

Mỗi lần sửa code:

```bash
git add .
git commit -m "Update features"
git push origin main
```

Render tự động deploy lại (nếu bật Auto-Deploy).

---

## XỬ LÝ LỖI THƯỜNG GẶP

### 1. "Build failed: npm install error"
**Nguyên nhân:** `package.json` thiếu dependencies

**Giải pháp:**
```bash
# Local test trước
cd nodejs
npm install
npm start

# Nếu OK thì push
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

### 2. "Application failed to respond"
**Nguyên nhân:** PORT không đúng

**Giải pháp:**
```javascript
// server.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. "Database connection failed"
**Nguyên nhân:** Sai thông tin kết nối

**Giải pháp:**
- Kiểm tra Environment Variables
- Dùng Internal Database URL thay vì External
- Xem logs: Tab "Logs" trong Render dashboard

### 4. "ECONNREFUSED" hoặc "timeout"
**Nguyên nhân:** Database chưa sẵn sàng hoặc sai SSL config

**Giải pháp:**
```javascript
// PostgreSQL cần SSL trên production
ssl: process.env.NODE_ENV === 'production' ? {
  rejectUnauthorized: false
} : false
```

### 5. Free tier sleep mode
**Hành vi:** App sleep sau 15 phút không dùng

**Giải pháp:**
- Chấp nhận (free tier)
- Upgrade lên Paid plan ($7/tháng)
- Dùng cron job để ping app (UptimeRobot)

---

## SO SÁNH CÁC PLATFORM

| Feature | Render | Railway | Vercel | Heroku |
|---------|--------|---------|--------|--------|
| **Node.js Free** | ✅ | ✅ | ✅ | ❌ |
| **PostgreSQL Free** | ✅ | ✅ | ❌ | ❌ |
| **MySQL Free** | ❌ | ✅ | ❌ | ❌ |
| **Sleep Mode** | Có (15 phút) | Không | Không | - |
| **Build Time** | 5-10 phút | 3-5 phút | 1-2 phút | - |
| **Region** | Singapore | Singapore | Global | US/EU |
| **Auto Deploy** | ✅ | ✅ | ✅ | ✅ |

**Kết luận:**
- **Render**: Tốt cho full-stack với PostgreSQL
- **Railway**: Tốt nếu cần MySQL
- **Vercel**: Tốt cho frontend, serverless functions

---

## CHECKLIST HOÀN THÀNH

- [ ] Code đã push lên GitHub
- [ ] Database đã tạo trên Render/External
- [ ] Schema đã import vào database
- [ ] Web Service đã deploy thành công
- [ ] Environment Variables đã cấu hình đúng
- [ ] Ứng dụng chạy OK tại URL Render
- [ ] Tất cả chức năng CRUD hoạt động
- [ ] Search hoạt động

---

## TÀI LIỆU THAM KHẢO

- **Render Docs:** https://render.com/docs
- **Node.js + PostgreSQL:** https://node-postgres.com
- **PlanetScale Docs:** https://planetscale.com/docs
- **Railway Docs:** https://docs.railway.app

---

## HỖ TRỢ

**Nếu gặp vấn đề:**
1. Xem Render Logs: Dashboard → Service → Logs
2. Xem Database Logs: Dashboard → Database → Logs
3. Test local trước: `npm install && npm start`
4. Check GitHub repo structure

**URL demo sau khi deploy:**
```
https://nodejs-product-app.onrender.com
```

Chúc bạn deploy thành công! 🎉
