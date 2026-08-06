# Implementation Guidelines: React (TS) & NestJS

This document provides a step-by-step guide to setting up and implementing the G-Scores application using React (TypeScript) for the frontend and NestJS (TypeScript) for the backend.

## 1. Backend: NestJS Setup

### Initialization
NestJS provides a powerful CLI that scaffolds the project for you using TypeScript by default.
1. Install the CLI globally: `npm i -g @nestjs/cli`
2. Create the backend project: `nest new backend`
3. Navigate into the folder: `cd backend`

### Database & ORM
Since you need an ORM, TypeORM or Prisma are excellent choices with NestJS.
- **TypeORM Example:**
  - Install dependencies: `npm install @nestjs/typeorm typeorm pg` (if using PostgreSQL)
  - Configure `TypeOrmModule` in your `app.module.ts`.

### Implementing the Requirements
- **Data Seeding & Migration:** 
  - Create a custom script or a NestJS command (using `nest-commander`) to parse `diem_thi_thpt_2024.csv` and populate the DB.
  - Use a library like `csv-parser` to parse the raw data file.
- **OOP for Subjects:** 
  - Create classes or interfaces representing `Subject` and `Score` entities. Use methods to encapsulate the logic for calculating totals and categorizing scores.
- **Validation:** 
  - Use `class-validator` and `class-transformer` along with NestJS `ValidationPipe` to strictly validate incoming requests.

### Core Endpoints
Use the Nest CLI to generate modules, controllers, and services:
- `nest g module scores`, `nest g controller scores`, `nest g service scores`
- Implement the 3 required APIs (Score Checker, Level Statistics, Top 10 Group A) inside the `scores.service.ts` and expose them via `scores.controller.ts`.

---

## 2. Frontend: React Setup with TypeScript

### Initialization
Vite is the recommended, modern way to set up React projects.
1. Create the project: `npm create vite@latest frontend -- --template react-ts`
2. Navigate into the folder and install: `cd frontend && npm install`

### Core Libraries
- **Routing:** Use `react-router-dom` to create distinct pages (e.g., `/`, `/dashboard`, `/top-students`).
- **State Management:** React Context API or simpler state management like Zustand or Redux Toolkit.
- **API Fetching:** Use `axios` or standard `fetch` combined with a library like `@tanstack/react-query` to handle caching and loading states gracefully.
- **Styling:** Integrate AdminLTE or TailAdmin (as suggested) or use TailwindCSS directly for quick, responsive UI.
- **Charts:** Use `recharts` or `chart.js` with `react-chartjs-2` to visualize the score level statistics.

### Component Structure
- Use **React Hooks** (`useState`, `useEffect`, `useMemo`) for all logic.
- Break down the UI into small, reusable components (e.g., `ScoreForm`, `ScoreTable`, `StatChart`).

---

## 3. Connecting the Two

- **CORS:** Ensure NestJS is configured to allow requests from the React frontend (e.g., `app.enableCors()`).
- **Environment Variables:** Keep API URLs in a `.env` file in the frontend (`VITE_API_URL=http://localhost:3000`). Keep database credentials in a `.env` file in the backend.
