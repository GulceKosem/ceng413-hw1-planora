# Planora — Smart Study Planner
- **Build:** `docker build -t planora:1.0 .`
- **Run:** `docker run -d --name planora-hw1 -p 8080:8080 -e APP_NAME=Planora planora:1.0`
- **Check:** Open http://localhost:8080 or run `curl http://localhost:8080/health`
- **Stop and remove:** `docker rm -f planora-hw1`
