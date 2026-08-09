FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json* turbo.json ./
# Copy workspace package.json files
COPY apps/backend/package.json ./apps/backend/
# Copy Prisma schema early for postinstall hook
COPY apps/backend/prisma ./apps/backend/prisma
# Copy shared packages
COPY packages ./packages

# Install dependencies
RUN npm install

# Copy source code
COPY apps/backend ./apps/backend

# Generate Prisma client
WORKDIR /app/apps/backend
RUN npx prisma generate

# Build backend
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
# Copy backend specific node_modules in case they were not hoisted
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/.env* ./apps/backend/
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
