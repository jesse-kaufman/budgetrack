###
### Stage 1: Build frontend
###
FROM node:22-alpine AS frontend-build
WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/
RUN npm ci

COPY frontend ./frontend
COPY shared ./shared
WORKDIR /app/frontend
RUN npm run build


###
### Stage 2: Backend dependencies
###
FROM node:22-alpine AS backend-build
WORKDIR /app

# Copy root package.json for top-level deps
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/
RUN npm ci --omit=dev --workspace=backend --workspace=shared

# Copy backend + shared code
COPY backend ./backend
COPY shared ./shared

# Clean up
RUN rm -Rf backend/__tests__ \
  backend/.env.test \
  backend/coverage \
  shared/__tests__ \
  shared/coverage


###
### Stage 3: Production image
###
FROM node:22-alpine

ARG APP_UID=1001
ARG APP_GID=1001

WORKDIR /app
VOLUME /app/backend/data

# Copy root package.json for scripts
COPY package*.json ./
COPY backend/package*.json ./backend/

# Copy backend + shared + top-level node_modules
COPY --from=backend-build /app/backend ./backend
COPY --from=backend-build /app/shared ./shared
COPY --from=backend-build /app/node_modules ./node_modules
# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./backend/public

RUN addgroup -g $APP_GID appgroup \
  && adduser -u $APP_UID -G appgroup -D appuser \
  && chown -R $APP_UID:$APP_GID /app

USER $APP_UID:$APP_GID

EXPOSE 3000
CMD ["npm", "start"]
