FROM node:22.1.0-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

FROM node:22.1.0-alpine3.19 AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json
RUN npm install --only=production
EXPOSE 3000

CMD [ "node", "./.output/server/index.mjs" ]