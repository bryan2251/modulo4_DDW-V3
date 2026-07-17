#!/bin/sh
set -e

echo "Esperando a Postgres y aplicando migraciones..."
npx prisma migrate deploy

echo "Iniciando backend..."
exec node dist/server.js