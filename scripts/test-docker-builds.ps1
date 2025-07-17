# Test script for all Docker builds (PowerShell)

Write-Host "🐳 Testing Docker builds..." -ForegroundColor Blue
Write-Host ""

# Test main Dockerfile
Write-Host "1️⃣ Testing main Dockerfile (Nginx)..." -ForegroundColor Yellow
try {
    docker build -t react-redux-app:test . *>$null
    Write-Host "✅ Main Dockerfile build: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "❌ Main Dockerfile build: FAILED" -ForegroundColor Red
}

# Test minimal Dockerfile
Write-Host ""
Write-Host "2️⃣ Testing minimal Dockerfile (Caddy)..." -ForegroundColor Yellow
try {
    docker build -f Dockerfile.minimal -t react-redux-app:minimal-test . *>$null
    Write-Host "✅ Minimal Dockerfile build: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "❌ Minimal Dockerfile build: FAILED" -ForegroundColor Red
}

# Test development Dockerfile
Write-Host ""
Write-Host "3️⃣ Testing development Dockerfile..." -ForegroundColor Yellow
try {
    docker build -f Dockerfile.dev -t react-redux-app:dev-test . *>$null
    Write-Host "✅ Development Dockerfile build: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "❌ Development Dockerfile build: FAILED" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 Image sizes:" -ForegroundColor Cyan
docker images | Select-String "react-redux-app.*test"

Write-Host ""
Write-Host "🧹 Cleaning up test images..." -ForegroundColor Yellow
docker rmi react-redux-app:test react-redux-app:minimal-test react-redux-app:dev-test *>$null

Write-Host ""
Write-Host "✅ Docker build tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To build for production:" -ForegroundColor Cyan
Write-Host "npm run docker:build"
Write-Host ""
Write-Host "🔒 To run with security:" -ForegroundColor Cyan
Write-Host "npm run docker:run-secure"
