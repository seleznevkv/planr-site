# syntax=docker/dockerfile:1
#
# rostpro-guide — Vite SPA + маленький Express-сервер (server.js) для
# /api/contact и раздачи статики из dist/. Собирается в две стадии: сборка
# фронта, затем лёгкий рантайм только с production-зависимостями.

# ---- build ----
FROM node:24-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build && npm prune --omit=dev

# ---- runtime ----
FROM node:24-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=80

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY server.js ./

EXPOSE 80
CMD ["node", "server.js"]
