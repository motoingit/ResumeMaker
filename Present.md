# Walkthrough: TypeScript Backend Development Environment on WSL2 Ubuntu

We have successfully restructured the workspace, configured a hot-reloaded TypeScript/Express application skeleton, transitioned the hosting environment to run directly on the WSL2 Ubuntu distro (bypassing Docker containers for host execution), and integrated custom timezone logging formats.

---

## 🛠️ Changes Implemented

### 1. Root Cleanup & Monorepo Setup
- Cleaned up legacy test files from the workspace root.
- Created `/backend` folder to host the Node.js API and prepare for the frontend to be added as a peer later.

### 2. Backend Config & ESM Migration
- Configured [backend/package.json](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/package.json) to use ES Modules (`"type": "module"`), using `tsx` for execution and hot-reloading.
- Configured [backend/tsconfig.json](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/tsconfig.json) to target `NodeNext` for module resolution.
- Updated all relative codebase imports in [app.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/app.ts) and [server.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/server.ts) to explicitly include `.js` file extensions, satisfying ES Module compliance.

### 3. Application Enhancements
- **IST Log Formatter**: Created a date-time formatting helper [backend/src/utils/DT_formater.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/utils/DT_formater.ts) to print localized Indian Standard Time (Asia/Kolkata).
- **Request Logger**: Integrated `DT_formater.ts` inside the request logging middleware in [backend/src/app.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/app.ts) to show IST timestamps for incoming HTTP queries.
- **Graceful Shutdowns**: Handled `SIGINT`/`SIGTERM` signals inside [backend/src/server.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/server.ts) for container and host lifecycle process management.

---

## 🧪 Verification Results (Direct WSL2 Ubuntu Hosting)

### 1. Local Dev Server Execution
The dev server was started directly inside WSL2 Ubuntu via `npm run dev`:
```text
> tsx watch src/server.ts

🚀 Server successfully launched in [development] mode
📡 Listening for HTTP requests on port 3000
```

### 2. Request Logging & Timezone Format
Querying the endpoint logs the incoming HTTP requests directly in Indian Standard Time (IST):
```text
[25 Jun 2026, 9:51:34 pm] GET /api/health
```

### 3. API Health Route Verification
Querying the endpoint from Windows host returns details of system health checks:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health"
```
**Response Output:**
```json
{
  "status": "success",
  "message": "Server is healthy, running, and tsx watch hot-reloading works!",
  "timestamp": "2026-06-25T15:51:34.617Z",
  "uptime": 2.790402424,
  "memoryUsage": {
    "rss": "101.73 MB",
    "heapTotal": "21.92 MB",
    "heapUsed": "11.17 MB"
  }
}
```

### 4. Hot-Reloading Functionality (tsx watch in Ubuntu)
Modified [backend/src/routes/health.route.ts](file://wsl.localhost/Ubuntu/home/moto-mohit/Projects/resume-builder/backend/src/routes/health.route.ts). The `tsx watch` process instantly recognized the change, restarted the process, and served the updated route response.
