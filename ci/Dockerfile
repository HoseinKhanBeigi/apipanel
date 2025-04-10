# Install dependencies only when needed
#FROM registry.kian.digital/node:18.17.0 AS deps
FROM hwregistry.kian.digital/infra/node:18.17.0-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
ENV NODE_ENV production
RUN yarn install

# Rebuild the source code only when needed
#FROM registry.kian.digital/node:18.17.0 AS builder
FROM hwregistry.kian.digital/infra/node:18.17.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV production
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
#FROM registry.kian.digital/infra/node:18.17.0-alpine3.10 AS runner
FROM hwregistry.kian.digital/infra/node:18.17.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
