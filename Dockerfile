# ---- Base Node ----
FROM node:carbon AS base

EXPOSE 3000
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies

COPY package*.json ./
RUN npm install ##--only=production

# ---- Copy sources & Build ----
FROM dependencies AS build

WORKDIR /app
COPY src ./src
COPY .env.* ./
COPY public ./public
RUN npm run build

# --- Release ----
FROM node:8.9-alpine AS release

WORKDIR /app
RUN npm -g install serve
COPY --from=build /app/build ./build

ENTRYPOINT serve -s build -p 3000