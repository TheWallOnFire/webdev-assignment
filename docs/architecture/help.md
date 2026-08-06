# Hướng dẫn chạy dự án G-Scores Local (Local Development Guide)

Dự án này sử dụng kiến trúc **Monorepo** với Frontend (React/Vite) và Backend (NestJS). Cơ sở dữ liệu sử dụng **PostgreSQL** kết nối qua **Prisma ORM**.

## 1. Yêu cầu cài đặt (Prerequisites)
Trước khi bắt đầu, hãy đảm bảo máy bạn đã cài đặt các phần mềm sau:
- **Node.js** (Phiên bản 18 trở lên)
- **Docker & Docker Compose** (Để chạy PostgreSQL cục bộ)
- **Git**

## 2. Cài đặt các thư viện (Installation)
Tại thư mục gốc (Root directory), chạy lệnh sau để cài đặt toàn bộ thư viện cho cả Frontend, Backend và Root:
```bash
npm install
```

## 3. Khởi tạo Database (PostgreSQL)
Dự án sử dụng Docker để giả lập Database.
1. Mở terminal, di chuyển vào thư mục docker:
   ```bash
   cd infrastructure/docker
   ```
2. Khởi chạy PostgreSQL:
   ```bash
   docker-compose up -d
   ```

## 4. Cấu hình biến môi trường (Environment Variables)
Bạn cần tạo các file `.env` từ file mẫu `.env.example`:

**Tại `apps/backend/`:**
Tạo file `.env` và thiết lập kết nối Prisma:
```env
# Mật khẩu và user phụ thuộc vào file docker-compose.yml của bạn
DATABASE_URL="postgresql://postgres:password@localhost:5432/g_scores?schema=public"
PORT=3000
```

**Tại `apps/frontend/`:**
Tạo file `.env` để trỏ gọi API về backend:
```env
VITE_API_URL="http://localhost:3000"
```

## 5. Khởi tạo Prisma & Dữ liệu (Migration & Seeding)
Tại thư mục gốc, hoặc thư mục `apps/backend`, bạn chạy các lệnh của Prisma để đồng bộ cấu trúc database:
```bash
cd apps/backend
npx prisma generate
npx prisma db push
```

*(Sau khi thiết lập xong script seed data từ file CSV, bạn có thể chạy thêm lệnh bơm dữ liệu giả: `npm run seed`)*

## 6. Chạy dự án (Run the application)
Nhờ sức mạnh của Turborepo, bạn không cần phải mở 2 terminal để chạy Frontend và Backend riêng biệt.
Chỉ cần đứng tại **thư mục gốc (root)** và gõ:
```bash
npm run dev
```
Hệ thống sẽ tự động khởi chạy cả 2 server đồng thời:
- **Frontend (React)**: http://localhost:5173
- **Backend (NestJS)**: http://localhost:3000

---
### Các lệnh hữu ích khác
- `npm run build`: Build toàn bộ dự án để chuẩn bị deploy.
- `npm run lint`: Chạy ESLint để quét lỗi code.
- `npm run format`: Chạy Prettier để tự động format lại code cho đẹp.
