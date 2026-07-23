# --- ETAPA 1: BUILDER ---
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build

# --- ETAPA 2: PRODUCCIÓN ---
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalamos dependencias de producción
RUN npm ci --omit=dev

# Copiamos la build de TypeScript y el Prisma Client generado
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma.config.ts ./

# Copiamos y damos permisos al script de entrada
COPY docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]

# Pasamos el comando por defecto al entrypoint
CMD ["node", "dist/server.js"]