# G-Scores (2024 National High School Exam Data) 🎓

A modern, high-performance web application designed to query, analyze, and visualize the 2024 Vietnamese National High School Exam results. Built as the final submission for the **Golden Owl Web Developer Intern Assignment**, this project features a scalable microservices architecture with a premium dark-mode interface.

![Tech Stack](https://skillicons.dev/icons?i=react,vite,tailwind,ts,nestjs,postgres,redis,prisma,docker)

---

## 🌟 Features Implemented

### Must-Have Requirements ✅
- **Automated Data Seeding**: Seamlessly reads and transforms raw `diem_thi_thpt_2024.csv` data directly into the PostgreSQL database using a custom, optimized Prisma seeder script.
- **Score Lookup**: A fast, visually striking search page to instantly retrieve and display detailed score cards for any student using their 8-digit registration ID.
- **Score Distribution Reports**: Generates accurate statistical reports categorizing students into 4 performance brackets (`>=8`, `6-8`, `4-6`, `<4`) for any subject, visualized via an interactive, gradient-styled pie chart.
- **Top 10 Group A Rankings**: Computes and displays the top 10 highest-scoring students in Group A (Math, Physics, Chemistry), featuring dynamic frontend sorting and a beautifully styled ranking table with medal icons.

### Nice-to-Have & Bonus Features 🚀
- **Premium Glassmorphism UI**: The frontend is built from the ground up with a completely custom, responsive Tailwind CSS design featuring dark-mode glassmorphism, dynamic gradients, hover animations, and tabular numerals.
- **Advanced State Management**: Implemented real-time interactive subject filtering and sorting directly in the frontend without requiring additional backend API calls.
- **Strict OOP Backend Architecture**: The NestJS backend enforces Domain-Driven Design (DDD) and strictly utilizes Object-Oriented Programming (OOP) patterns, particularly Factory Patterns for managing Subjects and Subject Groups.
- **High Performance**: 
  - Integrated **Redis Caching** on the backend to instantly serve expensive statistical queries.
  - Replaced N+1 query patterns with optimized raw SQL aggregations using Prisma.
- **Robust Validation**: Extensive API request validation using `class-validator` and `class-transformer` alongside strict Swagger OpenAPI typing.
- **Dockerized Infrastructure**: A complete, multi-stage `docker-compose` setup orchestrating the frontend, backend, PostgreSQL database, and Redis cache in a single command.

---

## 🏗️ Architecture & Tech Stack

This project is organized as a **Monorepo** using **Turborepo** for optimized build caching and workspace management.

### Backend (`/apps/backend`)
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Documentation**: Swagger OpenAPI (`/api/docs`)

### Frontend (`/apps/frontend`)
- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Routing**: React Router DOM v6

---

## 🚀 How to Run Locally

### Option A: Using Docker (Recommended)
The absolute easiest way to run the entire stack (Database, Redis, API, and Frontend) is via Docker Compose.

1. Ensure **Docker** and **Docker Desktop** are installed and running.
2. From the root directory, run:
   ```bash
   cd infrastructure/docker
   docker-compose up --build
   ```
3. The database will automatically seed itself on startup! Access the apps:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend Swagger API**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Option B: Manual Setup

#### 1. Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** & **Redis** running locally

#### 2. Installation
Install all monorepo dependencies:
```bash
npm install
```

#### 3. Backend & Database Setup
```bash
cd apps/backend
cp .env.example .env
```
*Edit `.env` to match your local PostgreSQL and Redis credentials.*

Migrate and seed the database:
```bash
npx prisma migrate dev
npm run seed
```

#### 4. Start the Application
Return to the root directory and start both apps simultaneously via Turbo:
```bash
cd ../..
npm run dev
```

---

## 👨‍💻 Author
**The Wall On Fire**  
*Developed for the Golden Owl Web Developer Intern Assignment (2024).*
