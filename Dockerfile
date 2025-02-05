FROM node:20.18.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM node:20.18.0-alpine
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s CMD wget -q -O /dev/null http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]