FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml .
RUN corepack enable && corepack prepare pnpm && pnpm fetch

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm && \
    pnpm install --frozen-lockfile --offline && \
    pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
