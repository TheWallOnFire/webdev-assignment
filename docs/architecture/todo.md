# Project Todo List: G-Scores Web Application

This document breaks down the requirements from the assignment `README.md` into actionable tasks.

## 1. Project Setup & Architecture
- [x] Choose a frontend framework: **React with TypeScript**. Ensure React Hooks are utilized.
- [x] Choose a backend framework: **NestJS with TypeScript**.
- [x] Choose a database system: **PostgreSQL**.
- [x] Set up an ORM tool: **Prisma**.
- [x] Set up the basic project structure for both frontend and backend.
- [x] Initialize Git repository and add a `README.md` with instructions to run locally.

## 2. Database & Data Seeding
- [x] Analyze the provided `dataset/diem_thi_thpt_2024.csv` file and design the database schema to store this data efficiently.
- [x] Write a database migration to create the necessary tables/collections.
- [x] Write a data seeder script to read the CSV file, parse the data, and insert it into the database. This script must be included in the source code.

## 3. Backend Development
- [ ] Implement Object-Oriented Programming (OOP) principles specifically for managing "subjects".
- [ ] Implement backend form validation and logic tightening to ensure data integrity and security.
- [x] **API Endpoint 1: Score Checker**
  - Create an endpoint that accepts a registration number and returns the corresponding student's scores.
- [ ] **API Endpoint 2: Score Level Statistics**
  - Create an endpoint to aggregate and return the number of students by subject, divided into the following 4 score levels:
    - `>= 8 points`
    - `>= 6 points and < 8 points`
    - `>= 4 points and < 6 points`
    - `< 4 points`
- [ ] **API Endpoint 3: Top 10 Group A Students**
  - Create an endpoint that calculates the total score for Group A (Math + Physics + Chemistry) and returns the top 10 students based on this total.

## 4. Frontend Development
- [ ] Optional: Integrate chosen UI templates (like AdminLTE or TailAdmin) and Google Font 'Rubik'.
- [ ] Implement form validation on the client-side for better user experience.
- [x] **Feature: Score Checker UI**
  - Create a page with an input field for the registration number and a display area to show the fetched scores.
- [ ] **Feature: Statistics Report UI**
  - Integrate a charting library (e.g., Chart.js, Recharts).
  - Create a dashboard page to fetch and visualize the score level statistics by subject using charts.
- [ ] **Feature: Top 10 Group A UI**
  - Create a table or list view to display the top 10 students for Group A, showing their individual subject scores and total Group A score.

## 5. Nice-to-Have Features (Optional but highly recommended)
- [ ] Ensure the entire frontend application has a **Responsive Design** (looks good on desktops, tablets, and mobile phones).
- [ ] Add a `Dockerfile` and `docker-compose.yml` to set up the project using **Docker** for easy environment replication.
- [x] **Deploy** the application (Frontend + Backend + Database) to a live server or free tier provider (e.g., Render, Vercel, Fly.io, Heroku) and provide the live demo link in the repository `README.md`.

## 6. Modern Web App Standards (Professional Additions)
- [ ] **Security:**
  - Implement Rate Limiting to prevent brute-force or DDoS attacks on endpoints.
  - Configure CORS, set secure HTTP headers (e.g., using `helmet` for Node.js), and sanitize inputs to prevent SQL Injection & XSS.
- [ ] **Performance & Optimization:**
  - Implement caching (e.g., Redis or in-memory) for the statistics and top 10 queries, as data is static and heavy to compute repeatedly.
  - Implement pagination for any future list endpoints.
- [ ] **Testing (QA):**
  - Write unit tests for core logic (e.g., data parsing and score calculations) using Jest, Mocha, or similar.
  - Implement basic E2E testing for the main user flows.
- [x] **API Documentation:**
  - Auto-generate API documentation using Swagger (OpenAPI) so frontend devs or external users can easily understand the endpoints.
- [ ] **CI/CD Pipeline:**
  - Set up GitHub Actions (or GitLab CI) to automatically run tests, linting, and build checks on every Pull Request.
- [ ] **Logging & Monitoring:**
  - Set up structured logging (e.g., Winston or Pino) and error tracking (e.g., Sentry) to catch unhandled exceptions in production.
