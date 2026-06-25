Invoke-RestMethod -Uri "http://localhost:3000/api/health"

# to remove cache in docker
docker compose down -v

# start with clean state
docker compose up --build
docker compose up

# Check the Live Logs
docker compose logs -f backend
