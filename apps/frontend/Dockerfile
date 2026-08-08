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
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Use Nginx to serve the static built files
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
