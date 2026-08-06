FROM node:20-alpine AS builder

WORKDIR /app

# Copy root configurations
COPY package.json package-lock.json* turbo.json ./
# Copy workspace package.json
COPY apps/frontend/package.json ./apps/frontend/
# Copy shared packages
COPY packages ./packages

# Install dependencies
RUN npm install

# Copy source code
COPY apps/frontend ./apps/frontend

# Build frontend
WORKDIR /app/apps/frontend
RUN npm run build

# Use Nginx to serve the static built files
FROM nginx:alpine

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
