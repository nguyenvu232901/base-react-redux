# Docker Guide cho React Redux App

## 📦 Files đã tạo

- `Dockerfile` - Production build với Nginx
- `Dockerfile.dev` - Development build
- `docker-compose.yml` - Production setup
- `docker-compose.dev.yml` - Development setup
- `nginx.conf` - Nginx configuration
- `.dockerignore` - Exclude files khỏi Docker build

## 🚀 Cách sử dụng

### 1. Build và Run Production

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Hoặc run in background
npm run docker:run-bg
```

**Manual commands:**
```bash
# Build
docker build -t react-redux-app:latest .

# Run
docker run -p 3000:80 react-redux-app:latest

# Run với custom API URL
docker run -p 3000:80 -e REACT_APP_API_BASE_URL=http://your-api-url react-redux-app:latest
```

### 2. Development với Docker

```bash
# Run development environment
npm run docker:dev

# Hoặc manual
docker-compose -f docker-compose.dev.yml up
```

### 3. Production với Docker Compose

```bash
# Run production environment
npm run docker:prod

# Hoặc manual
docker-compose up
```

## 🔧 Cấu hình Environment Variables

### Trong Docker run:
```bash
docker run -p 3000:80 \
  -e REACT_APP_API_BASE_URL=http://your-backend-url \
  react-redux-app:latest
```

### Trong docker-compose.yml:
```yaml
environment:
  - REACT_APP_API_BASE_URL=http://your-backend-url
```

## 🌐 Truy cập App

- **Production**: http://localhost:3000
- **Development**: http://localhost:3000
- **Health check**: http://localhost:3000/health

## 📱 Deploy cho Mobile Access

### 1. Local Network Access
```bash
# Tìm IP máy tính
npm run find-ip

# Run với IP binding
docker run -p 0.0.0.0:3000:80 react-redux-app:latest
```

### 2. Deploy lên Cloud
- **Docker Hub**: Push image và deploy
- **Render.com**: Deploy từ GitHub
- **Railway**: Deploy từ Dockerfile
- **Google Cloud Run**: Deploy container

## 🔍 Troubleshooting

### Build fails:
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t react-redux-app:latest .
```

### Container không start:
```bash
# Check logs
docker logs <container_id>

# Check running containers
docker ps -a
```

### API không connect:
1. Kiểm tra REACT_APP_API_BASE_URL
2. Đảm bảo backend đang chạy
3. Kiểm tra network connectivity
4. Xem browser console logs

## 📋 Useful Commands

```bash
# List images
docker images

# List containers
docker ps -a

# Stop all containers
docker stop $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# View container logs
docker logs <container_id>

# Execute command in container
docker exec -it <container_id> sh
```
