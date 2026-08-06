## Root Directory Structure

```text
g-scores/
├── .github/                         # 🚀 Tự động hóa & CI/CD Pipelines
│   ├── workflows/                   # Các luồng công việc của GitHub Actions
│   │   ├── ci.yml                   # Tự động chạy Unit Test, Linting khi có Pull Request
│   │   ├── cd-staging.yml           # Tự động Deploy lên môi trường Staging
│   │   └── cd-prod.yml              # Tự động Deploy lên môi trường Production (AWS/GCP)
│   └── pull_request_template.md     # Mẫu chuẩn bắt buộc khi tạo PR
│
├── .husky/                          # 🛡️ Git Hooks (Bảo vệ code trước khi commit)
│   ├── pre-commit                   # Chạy ESLint, Prettier trước khi cho phép commit
│   └── commit-msg                   # Kiểm tra format tin nhắn commit (Conventional Commits)
│
├── apps/                            # 📦 Các ứng dụng chính
│   ├── frontend/                    # ReactJS (Vite hoặc Next.js)
│   │   ├── .env.development         # Biến môi trường cho Dev
│   │   ├── .env.production          # Biến môi trường cho Prod
│   │   ├── .env.example             # Mẫu biến môi trường an toàn để commit lên Git
│   │   ├── Dockerfile               # Kịch bản đóng gói UI
│   │   ├── vercel.json              # (Thêm) Cấu hình deploy lên Vercel
│   │   └── src/                     # (Chi tiết cấu trúc bên dưới)
│   └── backend/                     # NestJS API Server
│       ├── .env.development         # Biến môi trường cho Dev
│       ├── .env.production          # Biến môi trường cho Prod
│       ├── .env.example             # Mẫu biến môi trường an toàn để commit lên Git
│       ├── Dockerfile               # Kịch bản đóng gói API Server
│       ├── fly.toml                 # (Thêm) Cấu hình deploy lên Fly.io
│       └── src/                     # (Chi tiết cấu trúc bên dưới)
│
├── packages/                        # 🧩 Shared Code (Code dùng chung)
│   ├── shared-types/                # DTOs, TypeScript Interfaces dùng chung cho Frontend & Backend
│   ├── shared-utils/                # Các hàm Regex, Validate dùng chung
│   ├── eslint-config/               # Cấu hình Linting chuẩn chung
│   └── tsconfig/                    # Cấu hình TypeScript chuẩn chung
│
├── infrastructure/                  # 🏗️ DevOps & IaC (Infrastructure as Code)
│   ├── docker/                      # Cấu hình docker-compose cho môi trường Local
│   │   ├── nginx/                   # Cấu hình Nginx
│   │   │   └── nginx.conf           # Cấu hình Nginx
│   │   ├── docker-compose.yml       # Khởi tạo Backend, Frontend, DB bằng 1 lệnh
│   │   └── init-db.sql              # Script tạo dữ liệu khởi tạo cho Database
│   ├── terraform/                   # Khởi tạo hạ tầng Cloud (AWS EC2, S3, RDS) bằng code
│   └── k8s/                         # Cấu hình Kubernetes cho scale lớn (Tùy chọn)
│
├── docs/                            # 📚 Tài liệu dự án
│   ├── architecture/                # Biểu đồ thiết kế hệ thống, sơ đồ C4
│   ├── api-specs/                   # Tài liệu OpenAPI/Swagger export
│   ├── guideline.md                 # Hướng dẫn quy trình phát triển
│   ├── structure.md                 # Tài liệu giải thích kiến trúc (File này)
│   └── todo.md                      # Task tracker - Danh sách công việc
│
├── scripts/                         # 🛠️ Công cụ hỗ trợ nội bộ (Bash/Shell)
│   ├── clean-cache.sh               # Script dọn dẹp bộ nhớ đệm hệ thống khi build lỗi
│   └── seed-database.sh             # Script bơm dữ liệu giả để test
│
├── dataset/                         # 📊 Dữ liệu thô ban đầu (VD: CSVs)
│
├── .gitignore                       # Bỏ qua các file không cần thiết
├── .eslintignore                    # Bỏ qua linting các file build
├── .prettierrc                      # Cấu hình format code chuẩn chung (Prettier)
├── commitlint.config.js             # Cấu hình quy tắc viết commit message
├── package.json                     # Quản lý dependencies chung và script tổng (Workspaces)
├── turbo.json                       # Cấu hình Turborepo (Quản lý build song song, caching)
└── README.md                        # Hướng dẫn setup dự án cơ bản cho nhân sự mới
```

### Hướng dẫn setup root directory:
- **setup turborepo**: Chạy `npx create-turbo@latest` để tự động gen ra cấu trúc monorepo chuẩn, hoặc tạo file `turbo.json` thủ công và định nghĩa `workspaces` trong `package.json` để nối app Frontend và Backend lại với nhau.
- **setup eslint & prettier**: Khởi tạo bằng lệnh `npm init @eslint/config` và cài thêm `npm i -D prettier eslint-config-prettier eslint-plugin-prettier`. Nên đặt file `.eslintrc` và `.prettierrc` ở thư mục `packages/eslint-config/` để dùng chung cho cả project.
- **setup commitlint**: Cài đặt `npm i -D @commitlint/cli @commitlint/config-conventional husky`. Sau đó gõ `npx husky install` và móc hook: `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'`.
- **setup typescript**: Chạy `npm i -D typescript`. Đặt `tsconfig.json` base ở `packages/tsconfig/` và dùng lệnh `extends` ở các file `tsconfig.json` của frontend/backend để kế thừa.
- **setup docker**: Tạo thư mục `infrastructure/docker/` và file `docker-compose.yml` để khai báo các dịch vụ dùng chung (ví dụ: `postgres`, `redis`). Bạn có thể link frontend và backend vào mạng Docker này.
- **setup deploy configs**:
  - `fly.toml`: (Dành cho Backend) Cài đặt Fly CLI, đứng tại thư mục `apps/backend` chạy `fly launch` để tự động gen cấu hình.
  - `vercel.json`: (Dành cho Frontend) Tạo file này trong `apps/frontend` định nghĩa rule cơ bản: `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}` để fix lỗi React Router khi F5.

---

## 1. Backend Structure (NestJS)

NestJS enforces a highly opinionated, modular structure (Domain-Driven Design).

```text
backend/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   │
│   ├── config/                      # File cấu hình (Database connection, biến môi trường)
│   │
│   ├── common/                      # Tài nguyên dùng chung nội bộ Backend
│   │   ├── decorators/              # Custom decorators (VD: @CurrentUser(), @Roles())
│   │   ├── filters/                 # Global exception filters (Xử lý lỗi tập trung)
│   │   ├── guards/                  # Authentication/Authorization guards
│   │   ├── interceptors/            # Request/Response interceptors
│   │   └── utils/                   # Helper functions (Xử lý ngày tháng, chuỗi)
│   │
│   ├── database/                    # Thiết lập TypeORM/Prisma và Migrations
│   │   └── migrations/              # (Thêm) Chứa file sinh tự động lịch sử tạo bảng DB
│   │
│   └── modules/                     # Feature modules (Tách theo domain)
│       ├── seeder/                  # Module đọc file CSV và đổ dữ liệu vào DB
│       └── scores/                  # Main Feature Module
│           ├── dto/                 # Data Transfer Objects (Validation đầu vào)
│           ├── entities/            # Định nghĩa các Bảng trong DB (ORM Entities)
│           ├── scores.controller.ts # API routing & endpoints
│           ├── scores.service.ts    # Logic nghiệp vụ xử lý dữ liệu
│           └── scores.module.ts     # Khai báo và liên kết module
│
├── test/                            # E2E Tests (Kiểm thử tự động End-to-End)
├── .env                             # Environment variables (Lưu trữ mật khẩu, key)
├── package.json                     # Quản lý thư viện riêng của backend
└── tsconfig.json                    # Cấu hình TypeScript riêng cho backend
```
### Hướng dẫn setup backend directory:
- **Setup nestjs**: Đứng tại thư mục `apps/`, chạy lệnh `npx @nestjs/cli new backend`. Nhớ chọn dùng npm, yarn hoặc pnpm (tùy thuộc root bạn đang dùng gì).
- **Setup typeorm**: (Đề bài bắt buộc dùng OOP, TypeORM là lựa chọn chuẩn nhất). Chạy `npm install @nestjs/typeorm typeorm pg`. Khai báo `TypeOrmModule.forRoot({...})` bên trong `app.module.ts`.
- **Setup prisma**: *(Lưu ý: Nếu dùng TypeORM thì bỏ qua Prisma và ngược lại)*. Nếu đổi ý dùng Prisma, chạy `npm i -D prisma` & `npx prisma init`. Nó sẽ tự tạo thư mục `prisma/schema.prisma`. 
- **Setup migration**: Thêm scripts vào `package.json` của backend: `"typeorm": "typeorm-ts-node-commonjs"`, `"migration:generate": "npm run typeorm migration:generate -d src/database/data-source.ts"`. Thư mục `migrations/` sẽ chứa các file sinh ra.
- **Setup docker**: Tạo `Dockerfile` ở ngay gốc thư mục backend, dùng image `node:18-alpine` làm base. Viết các command: `COPY package.json`, `npm install`, `COPY . .`, `npm run build`, và `CMD ["node", "dist/main.js"]`.

---

## 2. Frontend Structure (React + Vite)

A scalable feature-based structure for React. Groups code by feature instead of file type.

```text
frontend/
├── public/                          # Static assets (images, fonts, favicon)
│   └── fonts/                       # 
│       └── Rubik/                   # (Thêm) Chứa file font Rubik theo đề bài
│
├── src/
│   ├── main.tsx                     # React entry point và khai báo các Global Providers
│   ├── App.tsx                      # Root component (Nơi bọc Routing)
│   │
│   ├── assets/                      # Global styles, global images
│   ├── config/                      # Cấu hình ứng dụng (VD: API base URL)
│   │
│   ├── components/                  # UI Components dùng chung (Button, Input, Modal)
│   ├── hooks/                       # Custom hooks dùng chung toàn cục (useDebounce, useAuth)
│   ├── layouts/                     # Page layouts (Header, Sidebar, Footer)
│   ├── routes/                      # Cấu hình React Router (Public Route, Private Route)
│   ├── services/                    # API clients (Cấu hình Axios)
│   ├── store/                       # Global state management (Zustand/Redux/Context API)
│   ├── styles/                      # Global CSS, SCSS, Tailwind configuration
│   ├── types/                       # TypeScript declarations toàn cục
│   ├── utils/                       # Helper functions toàn cục
│   │
│   ├── features/                    # Tính năng độc lập (Feature-based)
│   │   ├── score-checker/           # Feature: Tra cứu điểm thi
│   │   │   ├── components/          # Components dành riêng cho tra cứu điểm thi
│   │   │   ├── hooks/               # Hooks xử lý logic tra cứu (useFetchScore)
│   │   │   └── types/               # Interface riêng của tra cứu
│   │   ├── statistics/              # Feature: Biểu đồ thống kê phổ điểm
│   │   └── top-students/            # Feature: Xếp hạng Top 10 khối A
│   │
│   └── pages/                       # Route components (Lắp ráp các features vào trang hoàn chỉnh)
│       ├── DashboardPage.tsx
│       ├── ScoreCheckerPage.tsx
│       └── TopStudentsPage.tsx
│
├── .env                             # Environment variables (VITE_API_URL)
├── index.html                       # HTML template chính
├── package.json                     # Quản lý thư viện của frontend
├── tsconfig.json                    # Cấu hình TypeScript cho frontend
└── vite.config.ts                   # Cấu hình Vite build tool
```
### Hướng dẫn setup frontend directory:
- **Setup vite & react & typescript**: Đứng tại thư mục `apps/`, chạy lệnh `npm create vite@latest frontend -- --template react-ts`. Vite sẽ tự động setup luôn cả React và TypeScript cho bạn một cách gọn gàng nhất.
- **Setup tailwindcss**: Chạy `npm install -D tailwindcss postcss autoprefixer`, sau đó khởi tạo cấu hình: `npx tailwindcss init -p`. Cập nhật `tailwind.config.js` mục `content` thành `["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`. Cuối cùng, thêm `@tailwind base; @tailwind components; @tailwind utilities;` vào đầu file `src/index.css`.