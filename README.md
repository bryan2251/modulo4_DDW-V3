# Task Manager
 
selector de tareas
 
[![CI](https://github.com/bryan2251/modulo4_DDW-V3/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bryan2251/modulo4_DDW-V3/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/bryan2251/modulo4_DDW-V3
cd task-manager
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).