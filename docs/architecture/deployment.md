# Deployment Guide

This document outlines the strategy for moving the G-Scores application from development to a live production environment. The deployment is split into three tiers: Database, Backend (API), and Frontend (Web).

---

## 1. Database Deployment (Supabase / Neon)
The database must be hosted on a cloud provider so both your local machine and the production backend can connect to it.

### Steps to Deploy:
1. **Create an Account**: Sign up for a free tier account on [Supabase](https://supabase.com/) or [Neon](https://neon.tech/).
2. **Create a Project**: Create a new Postgres Database project.
3. **Get Connection String**: Navigate to your database settings and copy the connection string (it starts with `postgresql://`).
4. **Run Migrations Locally**:
   - Open your local terminal in the `apps/backend` directory.
   - Update your local `.env` (or temporarily set it in your terminal) to point `DATABASE_URL` to the new production connection string.
   - Run the migration to build the schema on the production database: 
     ```bash
     npx prisma migrate deploy
     ```
   - Run the seeder to populate the remote database with the CSV data:
     ```bash
     npm run seed
     ```
*(Note: Seeding a million rows to a remote database might take a few minutes!)*

---

## 2. Backend Deployment (Render)
The backend is a NestJS application. It is already dockerized (`Dockerfile` is provided), making it very easy to deploy on Render's free tier.

### Steps to Deploy:
1. **Push Code**: Ensure all your code is pushed to your GitHub repository.
2. **Setup Render**: Log into [Render](https://render.com/) and create a new **Web Service**.
3. **Connect Repository**: Select your GitHub repository.
4. **Configuration**:
   - **Name**: `g-scores-api` (or similar)
   - **Environment**: Select `Docker`
   - **Root Directory**: Leave blank.
   - **Dockerfile Path**: `apps/backend/Dockerfile`
5. **Environment Variables**: 
   - Add `DATABASE_URL` and set its value to your Supabase/Neon connection string.
6. **Deploy**: Click create. Render will build the Docker container and start your server. Copy the public URL they provide (e.g., `https://g-scores-api.onrender.com`).

---

## 3. Frontend Deployment (Vercel)
The frontend is a React + Vite application. Vercel is the best platform for this.

### Steps to Deploy:
1. **Setup Vercel**: Log into [Vercel](https://vercel.com/) and click **Add New Project**.
2. **Import Repository**: Select your GitHub repository.
3. **Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `apps/frontend`
   - **Build Command**: `npm run build`
4. **Environment Variables**:
   - Add `VITE_API_BASE_URL` and set it to your Render backend URL (e.g., `https://g-scores-api.onrender.com/api/v1`).
5. **Deploy**: Click Deploy. Vercel will build and host your frontend application on a global CDN.

---

## Validation
Once all three tiers are deployed:
1. Visit your Vercel URL.
2. Enter a student ID (e.g. `01000001`) into the Score Checker.
3. Ensure the UI accurately retrieves and displays data from your remote backend and remote database.
