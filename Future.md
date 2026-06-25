# Implementation Plan: PostgreSQL & Prisma Database Integration

This plan outlines the steps to integrate **PostgreSQL** and **Prisma ORM** into our TypeScript backend. Since we are running the Node.js API directly on the WSL2 Ubuntu host, we will run the PostgreSQL database in a container via Docker Compose and connect to it over localhost.

---

## User Review Required

> [!IMPORTANT]
> **Hybrid Workflow Decision:**
> - The Express backend runs directly on your WSL2 Ubuntu host (`localhost:3000`).
> - The PostgreSQL database will run containerized in Docker (`localhost:5432`).
> - This hybrid workflow is highly recommended as it avoids having to install and manage database servers on WSL2 directly, while keeping backend execution fast and easy to debug.

> [!WARNING]
> We will configure environment variables (database credentials) in `backend/.env`. A `.env.example` file will be created to define the required variables without exposing secrets in source control.

---

## Open Questions

None. The database selection (PostgreSQL + Prisma) is defined in [Prompt.md](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/.notes/Prompt.md).

---

## Proposed Changes

### 1. Database Orchestration

* #### [MODIFY] [docker-compose.yml](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/docker-compose.yml)
  We will add a `db` service using the official lightweight `postgres:16-alpine` image. It will expose port `5432` to host localhost and set up persistent data volume storage.

---

### 2. Backend Config & Dependencies

* #### [MODIFY] [backend/package.json](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/package.json)
  We will add `@prisma/client` to dependencies, and `prisma` (the CLI) to devDependencies.

* #### [NEW] [backend/.env](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/.env)
  Contains local development environment variables, specifically the `DATABASE_URL` connection string:
  `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resume_builder?schema=public"`

* #### [NEW] [backend/.env.example](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/.env.example)
  Template environmental file for team onboarding.

* #### [MODIFY] [backend/src/config/index.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/config/index.ts)
  Extend Zod validation schema to validate and require `DATABASE_URL`.

---

### 3. Prisma Schema & Client

* #### [NEW] [backend/prisma/schema.prisma](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/prisma/schema.prisma)
  Initialize the Prisma schema. We will define basic schemas:
  - `User`: Storing basic user details (linked to auth IDs later).
  - `Resume`: Storing resume metadata and a structured JSON payload aligning with the **JSON Resume Standard**.

* #### [NEW] [backend/src/services/db.service.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/services/db.service.ts)
  Instantiates the global `PrismaClient` and registers cleanup hooks on server shutdowns.

---

### 4. Integration Verification Route

* #### [MODIFY] [backend/src/routes/health.route.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/routes/health.route.ts)
  Query the database (e.g. check connection or run a simple raw SELECT query) inside the healthcheck to verify connection health.

---

## Verification Plan

### Automated / CLI Verification
1. Run `docker compose up -d db` to boot the PostgreSQL database.
2. Initialize Prisma client and run initial migration:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Run the development server on host:
   ```bash
   npm run dev
   ```

### Manual Verification
1. Query `http://localhost:3000/api/health` in a browser/terminal.
2. Verify that the response payload includes a `"database": "connected"` or similar status flag showing database query success.
