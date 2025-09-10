FROM node:22.13.1 AS base

WORKDIR /app
COPY package*.json ./

FROM base AS development

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=1000

RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "run", "dev"]

FROM base AS builder
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npm run build
RUN npm run lint || true

FROM node:22.13.1 AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

WORKDIR /app/build
RUN npm ci --omit=dev

USER node
EXPOSE 3333
CMD ["npm", "run", "start"]