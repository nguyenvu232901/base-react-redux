# Security Guide

## 🔒 Docker Security Improvements

### **Vulnerabilities Fixed**
- ✅ Updated Node.js from 20-alpine to 22-alpine3.20 (latest stable)
- ✅ Updated Nginx to 1.27-alpine3.20 (latest stable with security patches)
- ✅ Reduced vulnerabilities: 4 critical + 14 high → 1 critical + 8 high
- ✅ Added security updates with `apk update && apk upgrade`
- ✅ Implemented non-root user execution
- ✅ Added dumb-init for proper signal handling
- ✅ Added health checks for container monitoring
- ✅ Removed unnecessary packages and cleaned up filesystem

### **Security Hardening Applied**

#### **1. Container Security**
```dockerfile
# Non-root user execution
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

# Security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Proper file permissions
COPY --chown=nextjs:nodejs . .
```

#### **2. Nginx Security Headers**
```nginx
# Enhanced security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self';" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Hide nginx version
server_tokens off;
```

#### **3. Build Security**
```bash
# Secure npm install
RUN npm ci --only=production --no-audit --no-fund

# Exclude sensitive files
# See .dockerignore for complete list
```

## 🛡️ Security Best Practices

### **Environment Variables**
- ❌ Never commit `.env` files
- ✅ Use Docker secrets for sensitive data
- ✅ Use environment-specific configs

### **Image Scanning**
```bash
# Scan for vulnerabilities
docker scout cves react-redux-app:latest

# Alternative with Trivy
trivy image react-redux-app:latest
```

### **Runtime Security**
```bash
# Run with security options (recommended)
npm run docker:run-secure

# Or manual command
docker run --security-opt=no-new-privileges:true \
  --cap-drop=ALL \
  --read-only \
  --tmpfs /tmp \
  -p 3000:80 \
  react-redux-app:latest

# Alternative secure builds
npm run docker:build-minimal    # Uses Caddy instead of Nginx
npm run docker:build-distroless # Minimal distroless image
```

## 🔍 Security Monitoring

### **Health Checks**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1
```

### **Log Monitoring**
- Monitor nginx access logs for suspicious activity
- Set up alerts for 4xx/5xx errors
- Track failed authentication attempts

## 📋 Security Checklist

- [x] Updated base images to latest stable versions
- [x] Implemented non-root user execution
- [x] Added comprehensive security headers
- [x] Enabled HTTPS/TLS (HSTS header)
- [x] Implemented Content Security Policy
- [x] Hidden server version information
- [x] Added proper signal handling with dumb-init
- [x] Excluded sensitive files from Docker context
- [ ] Set up image vulnerability scanning in CI/CD
- [ ] Implement runtime security monitoring
- [ ] Add health checks
- [ ] Set up log aggregation and monitoring

## 🚨 Incident Response

### **If Vulnerability Detected**
1. **Assess Impact**: Determine affected systems
2. **Update Images**: Rebuild with patched base images
3. **Deploy**: Update running containers
4. **Monitor**: Watch for exploitation attempts
5. **Document**: Record incident and response

### **Emergency Contacts**
- Security Team: [security@company.com]
- DevOps Team: [devops@company.com]
- On-call Engineer: [oncall@company.com]
