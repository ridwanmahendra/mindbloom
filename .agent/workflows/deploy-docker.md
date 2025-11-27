---
description: Deploy MindBloom dengan Docker
---

# Deploy MindBloom Application dengan Docker

Workflow lengkap untuk deployment aplikasi MindBloom menggunakan Docker dan Docker Compose.

## Prerequisites

1. **Install Docker & Docker Compose**
   ```bash
   # Cek instalasi Docker
   docker --version
   docker-compose --version
   ```

2. **Setup Environment Variables**
   ```bash
   # Copy template env file
   cp .env.example .env
   
   # Edit .env dan masukkan OPENAI_API_KEY
   nano .env
   ```

---

## Development Mode

Untuk development dengan hot-reload:

// turbo
1. **Start all containers**
   ```bash
   docker-compose up
   ```

2. **Akses aplikasi**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/api/health

3. **Stop containers**
   ```bash
   # Ctrl+C atau
   docker-compose down
   ```

---

## Production Build

Build dan run production containers:

// turbo
1. **Build images**
   ```bash
   docker-compose build
   ```

// turbo
2. **Start containers in detached mode**
   ```bash
   docker-compose up -d
   ```

// turbo
3. **Check container status**
   ```bash
   docker-compose ps
   ```

// turbo
4. **View logs**
   ```bash
   # All containers
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f server
   docker-compose logs -f client
   ```

// turbo
5. **Stop containers**
   ```bash
   docker-compose down
   ```

---

## Deploy to VPS (DigitalOcean, AWS EC2, etc.)

### 1. Setup VPS

```bash
# SSH ke VPS
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Upload Code ke VPS

**Option A: Git Clone**
```bash
# Di VPS
git clone https://github.com/your-username/mindbloom.git
cd mindbloom
```

**Option B: SCP dari local**
```bash
# Di local machine
scp -r /Users/ridwanmahenra/PROJECT/COEAI/mindbloom root@your-server-ip:/root/
```

### 3. Setup Environment

```bash
# Di VPS
cd mindbloom
cp .env.example .env
nano .env  # Edit dengan OPENAI_API_KEY Anda
```

### 4. Build dan Run

// turbo-all
```bash
# Build images
docker-compose build

# Start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 5. Setup Firewall (jika perlu)

```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp
sudo ufw allow 3001/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

### 6. Access Your App

```
http://your-server-ip
```

---

## Production Deployment dengan Domain & SSL

### 1. Point Domain ke VPS IP

Di DNS provider Anda, tambahkan A record:
```
A    @           your-server-ip
A    www         your-server-ip
```

### 2. Install Certbot untuk SSL

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Update nginx config dengan domain

Edit `nginx.conf`:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

### 4. Rebuild dan restart

```bash
docker-compose down
docker-compose build client
docker-compose up -d
```

---

## Useful Commands

### Container Management

```bash
# Stop all containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Restart specific service
docker-compose restart server

# Rebuild specific service
docker-compose build --no-cache client
```

### Troubleshooting

```bash
# View real-time logs
docker-compose logs -f

# Enter container shell
docker-compose exec server sh
docker-compose exec client sh

# Check container health
docker inspect --format='{{json .State.Health}}' mindbloom-server

# Clean up unused images
docker system prune -a
```

### Database Backup (jika ada)

```bash
# Backup volumes
docker-compose exec server tar -czf /backup/data.tar.gz /app/data

# Restore
docker-compose exec server tar -xzf /backup/data.tar.gz -C /
```

---

## Environment Variables

File `.env` yang diperlukan:

```env
# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Server Config
PORT=3001
NODE_ENV=production
```

---

## Monitoring

### Health Checks

```bash
# Server health
curl http://localhost:3001/api/health

# Check if containers are healthy
docker-compose ps
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

---

## Troubleshooting Common Issues

### Issue: Container won't start

**Solution:**
```bash
# Check logs
docker-compose logs server

# Rebuild without cache
docker-compose build --no-cache

# Remove and recreate
docker-compose down -v
docker-compose up -d
```

### Issue: API key not working

**Solution:**
```bash
# Verify .env file
cat .env

# Restart containers to reload env
docker-compose restart
```

### Issue: Port already in use

**Solution:**
```bash
# Find process using port
lsof -i :80
lsof -i :3001

# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead
```

### Issue: Can't connect to server from client

**Solution:**
- Check `nginx.conf` proxy_pass points to correct service name
- Verify both services are on same Docker network
- Check server logs: `docker-compose logs server`

---

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild images
docker-compose build

# Restart with new images
docker-compose up -d

# Clean old images
docker image prune
```

---

## Security Best Practices

1. **Never commit `.env` file** - use `.env.example` as template
2. **Use secrets management** for production (Docker Secrets, AWS Secrets Manager)
3. **Regular updates**: Keep Docker images updated
4. **Limit exposed ports**: Only expose necessary ports
5. **Use reverse proxy**: Put nginx in front for SSL/TLS
6. **Monitor logs**: Set up log aggregation (ELK stack, etc.)

---

## Next Steps

After deployment:
1. ✅ Test all features (chat, mood tracker, history)
2. ✅ Setup SSL/TLS with Let's Encrypt
3. ✅ Configure domain name
4. ✅ Setup monitoring (Prometheus, Grafana)
5. ✅ Configure automated backups
6. ✅ Setup CI/CD pipeline (GitHub Actions)
