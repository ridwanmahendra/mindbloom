# MindBloom 🌱

Platform konsultasi kesehatan mental berbasis AI untuk umum dan mahasiswa, didukung oleh OpenAI GPT.

## 🚀 Fitur

- **Konsultasi AI 24/7**: Chat dengan AI yang terlatih untuk kesehatan mental
- **Interface Modern**: Design premium dengan animasi smooth
- **Privasi Terjamin**: Percakapan aman dan private
- **Mudah Diakses**: Untuk umum dan mahasiswa

## 📋 Prerequisites

- Node.js (v18 atau lebih baru)
- NPM atau Yarn
- OpenAI API Key dari [OpenAI Platform](https://platform.openai.com/api-keys)

## ⚙️ Setup

### 1. Clone atau Download Project

### 2. Setup Backend

```bash
cd server
npm install
```

Buat file `.env` di folder `server/`:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

### 3. Setup Frontend

```bash
cd client
npm install
```

## 🏃 Menjalankan Aplikasi

### Jalankan Backend (Terminal 1)

```bash
cd server
npm run dev
```

Server akan berjalan di `http://localhost:3001`

### Jalankan Frontend (Terminal 2)

```bash
cd client
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📁 Struktur Project

```
mindbloom/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/          # Node.js backend
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔑 Mendapatkan OpenAI API Key

1. Kunjungi [OpenAI Platform](https://platform.openai.com/api-keys)
2. Login atau Sign up dengan akun Anda
3. Klik "Create new secret key"
4. Beri nama key (opsional) dan copy API key
5. Paste ke file `.env`

> **Note:** OpenAI API berbayar, tapi ada free trial $5 credit untuk user baru

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4o-mini
- **Icons**: Lucide React

## 📝 License

MIT
