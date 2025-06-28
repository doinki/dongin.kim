FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
RUN corepack enable pnpm
RUN apk add --no-cache gcompat

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm

COPY --from=deps /app/node_modules node_modules
COPY . ./
RUN pnpm install --frozen-lockfile --offline && \
    pnpm build

FROM base AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
