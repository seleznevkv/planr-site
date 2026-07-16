# syntax=docker/dockerfile:1
#
# planr-site — Next.js 16 (App Router, RSC). Собирается в standalone-режиме
# (next.config.ts: output: "standalone") и запускается node-сервером, а не как
# статика в nginx — App Router/RSC требуют рантайм.

# ---- build ----
FROM node:24-bookworm-slim AS build
WORKDIR /app

ARG version=0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

# ---- runtime ----
FROM node:24-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=80 \
    HOSTNAME=0.0.0.0

# standalone: самодостаточный сервер + минимальные node_modules, плюс статика и public.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 80
CMD ["node", "server.js"]
