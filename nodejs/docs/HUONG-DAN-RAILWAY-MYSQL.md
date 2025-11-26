# HƯỚNG DẪN DÙNG MYSQL TRÊN RAILWAY.APP

## Bước 1: Tạo tài khoản Railway

1. Truy cập: https://railway.app
2. Click "Login" → Sign in with GitHub
3. Authorize Railway

## Bước 2: Tạo MySQL Database

1. Dashboard → Click "New Project"
2. Chọn "Provision MySQL"
3. Đợi 1-2 phút để Railway tạo database

## Bước 3: Lấy thông tin kết nối

1. Click vào MySQL service
2. Tab "Variables" → Copy:
   ```
   MYSQL_HOST
   MYSQL_PORT
   MYSQL_USER
   MYSQL_PASSWORD
   MYSQL_DATABASE
   MYSQLHOST
   MYSQLPORT
   MYSQLUSER
   MYSQLPASSWORD
   MYSQLDATABASE
   ```

## Bước 4: Cập nhật file .env local

Mở file `.env` trong thư mục nodejs:

```env
DB_HOST=[MYSQL_HOST từ Railway]
DB_USER=[MYSQL_USER từ Railway]
DB_PASSWORD=[MYSQL_PASSWORD từ Railway]
DB_NAME=[MYSQL_DATABASE từ Railway]
DB_PORT=[MYSQL_PORT từ Railway]
PORT=3000
NODE_ENV=development
```

## Bước 5: Import Database Schema

**Cách 1: Dùng MySQL Workbench**

1. Download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Tạo connection mới:
   - Hostname: [MYSQL_HOST từ Railway]
   - Port: [MYSQL_PORT từ Railway]
   - Username: [MYSQL_USER từ Railway]
   - Password: [MYSQL_PASSWORD từ Railway]
3. Test Connection → OK
4. File → Open SQL Script → Chọn `database.sql`
5. Execute (⚡)

**Cách 2: Dùng Railway CLI**

```bash
# Cài Railway CLI
npm install -g @railway/cli

# Đăng nhập
railway login

# Link project
railway link

# Kết nối MySQL
railway connect mysql

# Paste nội dung database.sql
```

**Cách 3: Dùng script (sau khi cập nhật .env)**

```bash
npm run setup-db
```

## Bước 6: Test kết nối

```bash
npm start
```

Mở: http://localhost:3000

## Bước 7: Deploy lên Render

Cập nhật Environment Variables trên Render:

```
DB_HOST = [MYSQL_HOST từ Railway]
DB_PORT = [MYSQL_PORT từ Railway]
DB_USER = [MYSQL_USER từ Railway]
DB_PASSWORD = [MYSQL_PASSWORD từ Railway]
DB_NAME = [MYSQL_DATABASE từ Railway]
NODE_ENV = production
```

Deploy xong!

---

## LƯU Ý

- Railway MySQL free: 512MB RAM, 1GB storage
- Không sleep như Render
- Uptime tốt hơn các service free khác
