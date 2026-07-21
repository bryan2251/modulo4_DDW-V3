FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Copiamos la carpeta de prisma para que el schema.prisma esté accesible
COPY prisma ./prisma/

# Instalamos todas las dependencias
RUN npm ci

# Generamos el cliente de Prisma (crea node_modules/.prisma)
RUN npx prisma generate

COPY . .
# Compilamos TypeScript a JavaScript
RUN npm run build

# --- ETAPA FINAL DE PRODUCCIÓN ---
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalamos dependencias de producción
RUN npm ci --omit=dev

# Copiamos el Prisma Client generado desde la etapa de compilación
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma.config.ts ./
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["node", "dist/server.js"]