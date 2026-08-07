FROM oven/bun:alpine AS build

WORKDIR /app

COPY package.json bun.lock /app/

RUN bun install --frozen-lockfile

COPY . /app

RUN bun run build

# Fail the build instead of shipping an image whose i18n messages never
# got bundled - that failure is silent at runtime and only shows up as
# raw translation keys in the UI.
RUN grep -rq "Befehlspalette" /app/.output \
    || (echo "ERROR: locale messages missing from build output" && exit 1)

FROM oven/bun:alpine

LABEL org.opencontainers.image.title="Waffle" \
      org.opencontainers.image.description="Minimalistic flexible homepage" \
      org.opencontainers.image.url="https://danielvici.github.io/waffle/" \
      org.opencontainers.image.documentation="https://danielvici.github.io/waffle/" \
      org.opencontainers.image.source="https://github.com/danielvici/waffle" \
      org.opencontainers.image.authors="danielvici123 <daniel@danielvici.com>" \
      org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY --from=build /app/.output /app
COPY --from=build /app/extra/healthcheck.mjs /app/extra/healthcheck.mjs

EXPOSE 3000/tcp

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s CMD ["bun", "/app/extra/healthcheck.mjs"]

CMD ["bun","/app/server/index.mjs"]
