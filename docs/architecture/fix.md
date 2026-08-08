# Vercel Deployment Plan for G-Scores

This document outlines the step-by-step plan to deploy the complete G-Scores application using **Vercel** for both the frontend (React/Vite) and the backend (NestJS via Vercel Serverless), along with a cloud database.

## Architecture Overview

*   **Frontend (React/Vite):** Vercel
*   **Backend (NestJS):** Vercel (Serverless Functions via `@vercel/node`)
*   **Database (PostgreSQL):** Supabase, Neon, or Vercel Postgres

---

## Phase 1: Database Setup (Cloud PostgreSQL)

Since Vercel requires a remote database, we need to provision one.

1.  Create a free PostgreSQL database on **Neon**, **Supabase**, or **Vercel Postgres**.
2.  Copy the connection string (e.g., `postgresql://user:password@host/dbname?sslmode=require`).
3.  Save this connection string. You will need it for the backend environment variables.

---

## Phase 2: Backend Deployment on Vercel (Serverless)

We have already configured `vercel.json` and adapted `src/main.ts` in the `apps/backend` directory to export the Express instance required for Vercel Serverless compatibility.

1.  Log in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
2.  Import your GitHub repository containing the G-Scores code.
3.  **Project Configuration:**
    *   **Project Name:** `g-scores-backend`
    *   **Framework Preset:** `Other`
    *   **Root Directory:** `apps/backend` (Click Edit and select the `apps/backend` folder).
4.  **Build and Output Settings:**
    *   Build Command: `npm install && npx prisma generate && npm run build`
    *   Output Directory: `dist` (or leave default as Vercel handles the Serverless build via `vercel.json`)
5.  **Environment Variables:**
    *   `DATABASE_URL`: *[Your Cloud PostgreSQL URL from Phase 1]*
    *   `JWT_SECRET`: *[A strong random string]*
6.  Click **Deploy**. Once finished, copy the deployed backend URL (e.g., `https://g-scores-backend.vercel.app`).

---

## Phase 3: Frontend Deployment on Vercel

Vercel natively supports Vite, making the frontend deployment incredibly easy.

1.  Go back to the Vercel dashboard and click **Add New... > Project**.
2.  Import the same GitHub repository again.
3.  **Project Configuration:**
    *   **Project Name:** `g-scores-frontend`
    *   **Framework Preset:** `Vite`
    *   **Root Directory:** `apps/frontend` (Click Edit and select the `apps/frontend` folder).
4.  **Build and Output Settings (Should be auto-detected):**
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
5.  **Environment Variables:**
    *   Add a new variable named `VITE_API_BASE_URL`.
    *   Set the value to your deployed backend URL from Phase 2 (e.g., `https://g-scores-backend.vercel.app/api`).
6.  Click **Deploy**.

---

## Phase 4: Database Migrations & Seeding

Once the database is hosted, you need to apply your Prisma schema and seed data.

1.  On your local machine, update your local `apps/backend/.env` with the production `DATABASE_URL`.
2.  Run the migrations against the production database:
    ```bash
    cd apps/backend
    npx prisma migrate deploy
    ```
3.  Seed the database:
    ```bash
    npm run seed
    ```

---

## Phase 5: Final Verification
1.  Open your Vercel frontend URL (e.g., `https://g-scores-frontend.vercel.app`).
2.  Verify that data loads correctly from the backend.
3.  Ensure CORS is properly configured in your NestJS backend to allow requests from the `.vercel.app` domain.
