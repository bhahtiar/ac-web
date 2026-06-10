# ArcticAir — AC Service Landing Page

One-page landing page built with **Next.js 16 + Tailwind CSS v4**, ready to deploy on Vercel.

## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- TypeScript
- Google Fonts (Orbitron + Inter)

## Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A — Via CLI
```bash
npm install -g vercel
vercel
```

### Option B — Via GitHub
1. Push repo ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repo → Deploy (auto-detect Next.js)

## Customization
Edit `app/page.tsx`:
- **Nomor WA**: ganti `628123456789` dengan nomor bisnis Anda
- **Nama bisnis**: ganti `ArcticAir` 
- **Area coverage**: edit array di section Contact
- **Harga layanan**: edit array `services`
- **Kontak info**: edit array di section Contact
