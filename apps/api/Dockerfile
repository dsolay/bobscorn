# syntax=docker/dockerfile:1.2

FROM node:24.11.1-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN set -ex ; \
  corepack enable pnpm

FROM base AS builder

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

# hadolint ignore=DL3008
RUN set -ex; \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  openssl && \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY pnpm*.yaml ./

RUN pnpm fetch

COPY . .

RUN CI=true pnpm install -r --offline

RUN set -ex; \
  pnpm prisma migrate deploy && \
  pnpm prisma generate && \
  pnpm build && \
  CI=true pnpm prune --prod

FROM base

WORKDIR /srv/www/api

# hadolint ignore=DL3008
RUN set -ex; \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  curl \
  ca-certificates \
  dumb-init \
  openssl && \
  \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Add a non-root user
ARG USERNAME=app
ARG PUID=1001
ARG PGID=1001
ENV PUID ${PUID}
ENV PGID ${PGID}

RUN set -x ; \
  addgroup --gid ${PGID} ${USERNAME} ; \
  adduser \
  --uid ${PUID} \
  --disabled-password \
  --gid ${PGID} \
  --comment ${USERNAME} \
  ${USERNAME}

COPY --from=builder /app/dist/ .
COPY --from=builder /app/prisma/dev.db ./prisma/dev.db
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R ${USERNAME}:${USERNAME} /srv/www/api

USER ${USERNAME}

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE ${PORT}

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "src/index.js"]
