---
description: Deploy MindBloom ke Render (Full-Stack)
---

# Deploy MindBloom ke Render

Panduan lengkap untuk deploy aplikasi MindBloom full-stack ke Render platform. **100% GRATIS** dengan free tier!

## 🎯 Overview

Render akan menjalankan 2 services:
1. **Backend API** (Node.js/Express) - `mindbloom-api`
2. **Frontend** (React Static Site) - `mindbloom-client`

---

## 📋 Prerequisites

1. **Akun Render** - Daftar di [render.com](https://render.com) (gratis)
2. **GitHub Account** - Push code ke GitHub repository
3. **OpenAI API Key** - Dari [platform.openai.com](https://platform.openai.com/api-keys)

---

## 🚀 Method 1: Deploy dengan Render Blueprint (Otomatis)

Cara tercepat - deploy kedua services sekaligus!

### Step 1: Push Code ke GitHub

```bash
# Jika belum init git
cd /Users/ridwanmahenra/PROJECT/COEAI/mindbloom
git init
git add .
git commit -m "Initial commit for Render deployment"

# Create repo di GitHub, lalu:
git remote add origin https://github.com/YOUR_USERNAME/mindbloom.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy ke Render

1. Login ke [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render akan otomatis detect `render.yaml` dan setup kedua services!

### Step 3: Set Environment Variables

Di Render Dashboard:
1. Buka **mindbloom-api** service
2. Pergi ke **Environment**
3. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-xxxxx` (your API key)
4. Click **Save Changes**

### Step 4: Update Frontend API URL

Setelah backend deploy, Render akan memberikan URL seperti:
```
https://mindbloom-api.onrender.com
```

Update `render.yaml` di bagian frontend routes:
```yaml
routes:
  - type: rewrite
    source: /api/*
    destination: https://mindbloom-api.onrender.com/api/*  # Ganti dengan URL Anda
```

Commit dan push perubahan:
```bash
git add render.yaml
git commit -m "Update API URL"
git push
```

Render akan auto-redeploy!

---

## 🔧 Method 2: Deploy Manual (Step by Step)

Jika mau kontrol lebih, deploy satu per satu:

### Deploy Backend API

1. **Login ke Render Dashboard**
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Configure:
   ```
   Name: mindbloom-api
   Region: Singapore (atau terdekat)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
5. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `OPENAI_API_KEY` = `sk-proj-xxxxx`
6. Click **"Create Web Service"**

### Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   ```
   Name: mindbloom-client
   Region: Singapore
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. **Advanced** → Add rewrite rules:
   ```
   Source: /api/*
   Destination: https://mindbloom-api.onrender.com/api/*
   Action: Rewrite
   ```
5. Click **"Create Static Site"**

---

## 🌐 Accessing Your App

Setelah deploy selesai (5-10 menit):

- **Frontend**: `https://mindbloom-client.onrender.com`
- **Backend API**: `https://mindbloom-api.onrender.com`
- **Health Check**: `https://mindbloom-api.onrender.com/api/health`

---

## ⚙️ Configuration Files

### render.yaml (Blueprint)

File `render.yaml` sudah dibuat otomatis. Ini memungkinkan:
- ✅ Deploy kedua services sekaligus
- ✅ Auto-rebuild saat git push
- ✅ Consistent configuration

### Environment Variables

**Backend (`mindbloom-api`):**
```env
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=sk-proj-xxxxx  # SET DI RENDER DASHBOARD
```

**Frontend (`mindbloom-client`):**
Tidak perlu env vars, API URL diset via rewrite rules.

---

## 🔄 Auto Deploy (CI/CD)

Setelah setup awal, setiap kali Anda push ke GitHub:

```bash
git add .
git commit -m "Update feature"
git push
```

Render akan **otomatis**:
1. Detect perubahan
2. Build ulang
3. Deploy versi baru
4. Zero downtime!

---

## 📊 Monitoring & Logs

### View Logs

Di Render Dashboard:
1. Pilih service (api atau client)
2. Tab **"Logs"**
3. Real-time logs akan muncul

### Metrics

Render free tier menyediakan:
- Request count
- Response time
- Error rates
- Build history

---

## 🐛 Troubleshooting

### Issue: Build gagal

**Solution:**
```bash
# Test build locally dulu
cd client
npm install
npm run build

cd ../server
npm install
node server.js
```

### Issue: API tidak bisa diakses dari frontend

**Solution:**
1. Cek rewrite rules di Static Site settings
2. Pastikan backend service sudah running (check logs)
3. Verify `OPENAI_API_KEY` sudah diset di backend env vars

### Issue: Cold Start (Free Tier)

Render free tier akan "sleep" setelah 15 menit idle:
- **Symptom**: First request lambat (30-60 detik)
- **Solution**: Normal behavior di free tier
- **Upgrade**: Paid plan ($7/month) untuk always-on

### Issue: CORS Error

**Solution:**
Backend sudah ada `cors()` middleware, tapi jika masih error, update:

```javascript
// server/server.js
app.use(cors({
  origin: 'https://mindbloom-client.onrender.com',
  credentials: true
}));
```

---

## 💰 Pricing & Limits

### Free Tier Includes:

**Static Sites:**
- ✅ Unlimited sites
- ✅ 100 GB bandwidth/month
- ✅ Global CDN
- ✅ Auto SSL/TLS

**Web Services:**
- ✅ 750 hours/month (cukup untuk 1 service 24/7)
- ✅ Sleep after 15 min idle
- ✅ 512 MB RAM
- ✅ 0.1 CPU

### Upgrade Options:

Jika perlu always-on:
- **Starter**: $7/month (512 MB RAM, always-on)
- **Standard**: $25/month (2 GB RAM)

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - ✅ NEVER commit `.env` file
   - ✅ Set `OPENAI_API_KEY` di Render dashboard
   - ✅ Use Render's encrypted env vars

2. **API Keys**
   - ✅ Rotate API keys regularly
   - ✅ Monitor usage di OpenAI dashboard
   - ✅ Set spending limits

3. **HTTPS**
   - ✅ Render provides free SSL (automatic)
   - ✅ All traffic encrypted

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain

1. Di Static Site settings → **Custom Domains**
2. Add domain: `mindbloom.com`
3. Update DNS di domain registrar:
   ```
   CNAME www  mindbloom-client.onrender.com
   A     @    <IP yang diberikan Render>
   ```
4. Render auto-provision SSL certificate

---

## 📈 Scaling & Performance

### Optimize Build Time

Edit `render.yaml`:
```yaml
buildCommand: cd client && npm ci && npm run build
```
(`npm ci` lebih cepat dari `npm install`)

### Cache Strategy

Render otomatis cache:
- `node_modules`
- Build artifacts

### Performance Tips

1. **Enable Compression**: Frontend sudah optimize via Vite
2. **Asset Caching**: Render CDN handle ini
3. **API Optimization**: Monitor OpenAI API response time

---

## 🔄 Update & Rollback

### Deploy Update

```bash
git add .
git commit -m "New feature"
git push  # Auto deploy!
```

### Rollback

Di Render Dashboard:
1. Service → **Deploys**
2. Pilih previous successful deploy
3. Click **"Redeploy"**

---

## ✅ Post-Deployment Checklist

Setelah deploy berhasil:

- [ ] Test semua fitur:
  - [ ] Chat dengan AI (verify OpenAI API works)
  - [ ] Mood Tracker
  - [ ] Chat History
  - [ ] Resources page
- [ ] Check browser console (no errors)
- [ ] Test di mobile browser
- [ ] Monitor logs untuk errors
- [ ] Set up monitoring/alerts (optional)

---

## 🆘 Support

Jika ada masalah:
1. **Render Docs**: [docs.render.com](https://docs.render.com)
2. **Community**: [community.render.com](https://community.render.com)
3. **Status**: [status.render.com](https://status.render.com)

---

## 🎉 Next Steps

Setelah deploy berhasil:
1. ✅ Share app dengan users
2. ✅ Monitor usage & logs
3. ✅ Setup custom domain
4. ✅ Add analytics (Google Analytics, etc.)
5. ✅ Implement feedback system
6. ✅ Consider upgrading for production use

---

**Selamat! 🚀 Aplikasi MindBloom Anda sudah live di internet!**
