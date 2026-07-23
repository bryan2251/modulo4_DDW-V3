#!/bin/sh
set -e

echo "==> Ejecutando migraciones de base de datos..."
# Si Prisma está en devDependencies, ejecutamos mediante la CLI invocando el archivo directamente
npx prisma migrate deploy || ./node_modules/.bin/prisma migrate deploy

echo "==> Iniciando aplicación..."
# exec "$@" ejecuta la instrucción que venga definida en el CMD del Dockerfile
exec "$@"