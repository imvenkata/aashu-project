FROM node:20-alpine as frontend-build

WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Backend and final image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install MongoDB tools
RUN apk add --no-cache mongodb-tools

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install --production

# Copy backend code
COPY backend/ ./

# Copy built frontend from the frontend-build stage
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["node", "server.js"]
