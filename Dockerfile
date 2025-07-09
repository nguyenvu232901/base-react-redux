# Multi-stage build for React app
# Using latest stable version with security patches
FROM node:22-alpine3.20 AS build

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --no-audit --no-fund

# Copy source code
COPY --chown=nextjs:nodejs . .

# Switch to non-root user for build
USER nextjs

# Set environment variables for build
ENV CI=false
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=4096

# Build the app for production with verbose logging
RUN npm run build --verbose || (echo "Build failed, checking logs..." && cat /tmp/build.log 2>/dev/null || echo "No build log found" && exit 1)

# Production stage with Nginx
# Using latest stable version with security patches
FROM nginx:1.27-alpine3.20

# Install security updates and minimal packages
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    # Remove unnecessary packages and clean up
    apk del --purge apk-tools && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man/* /usr/share/doc/*

# Create non-root user for nginx
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S nginx-user -u 1001 -G nginx-user

# Copy built app from build stage
COPY --from=build --chown=nginx-user:nginx-user /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY --chown=nginx-user:nginx-user nginx.conf /etc/nginx/nginx.conf

# Set proper permissions
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown nginx-user:nginx-user /var/run/nginx.pid

# Switch to non-root user
USER nginx-user

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Expose port 80
EXPOSE 80

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
