FROM node:22.11.0 as deps

ENV TZ='Europe/Moscow'
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.11.0 as builder

ARG SEARCH_API_URL
ARG API_URL
ARG URL
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_PROJECT_NAME
ARG SENTRY_URL
ARG NEXT_PUBLIC_SENTRY_DSN

ENV TZ='Europe/Moscow'
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM node:22.11.0 as vrf_ru-app

ENV TZ='Europe/Moscow'
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV='production'
ENV HOSTNAME='0.0.0.0'
ENV PORT=3000
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", "server.js"]


FROM nginx:1.27-bookworm as vrf_ru-nginx

ENV TZ='Europe/Moscow'
ENV DOMAIN='vrf.ru'
ENV BACKEND_ADDRESS='127.0.0.1:3000'
CMD ["nginx", "-g", "daemon off;"]
RUN rm -rf /usr/share/nginx/html/* && rm -f /etc/nginx/conf.d/default.conf
COPY ./.ci/docker/nginx.conf /etc/nginx/nginx.conf
COPY ./.ci/docker/templates/*.template /etc/nginx/templates/
COPY --from=builder --chown=nginx /app/.next/static /usr/share/nginx/html/static
COPY --from=builder --chown=nginx /app/public /usr/share/nginx/html
