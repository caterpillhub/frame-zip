# 📦 FrameZip

Turn a folder of image frames into a single cinematic 16:9 composite image — directly in the browser.

FrameZip allows users to upload a ZIP file containing image frames and generates a combined 1920×1080 image where each frame is resized into vertical strips and stitched together.

No local setup. No Python required. Everything runs in the cloud.

**🚀 Live Link:** https://frame-zip.vercel.app/

## 🚀 MVP Overview

This project is a full-stack web application built with:

- **Frontend:** Next.js 16 (App Router) + React 19
- **Backend:** Flask + Pillow
- **Deployment:** Vercel (frontend) + Render (backend)
- **Persistence:** SQLite (download counter)

The MVP focuses on:

- Secure ZIP upload
- Memory-efficient image processing
- Server-side composition
- Persistent global download counter
- Clean modern UI

## 🧠 How It Works

1. User uploads a .zip file containing image frames.
2. Backend extracts images safely.
3. Each image is resized into a vertical strip.
4. All strips are stitched into a single 1920×1080 image.
5. Final image is returned as a downloadable JPEG.

Processing is done one image at a time to reduce memory usage.

## ✨ Features (MVP Scope)

- ✅ ZIP file upload (up to 200MB)
- ✅ Supports JPG, PNG, BMP, TIFF, WEBP
- ✅ Max 300 images per ZIP
- ✅ Secure ZIP extraction (prevents path traversal)
- ✅ Memory-efficient processing
- ✅ Persistent global download counter (SQLite)
- ✅ Modern dark-themed UI
- ✅ Production-ready deployment setup

## 🛡 Security Considerations

- ZIP extraction is validated to prevent directory traversal attacks
- File size limit enforced
- Image count limit enforced
- Only supported image formats processed
- Temporary directories auto-cleaned

## 🏗 Project Structure

```
frame-zip/
│
├── backend/
│   ├── server.py
│   ├── apis.py
│   ├── framezip.py
│   └── requirements.txt
│
└── frontend/
    ├── app/
    ├── components/
    ├── hooks/
    └── package.json
```

## 🧪 Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python server.py
```

Backend runs on:

- `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Frontend runs on:

- `http://localhost:3000`

## 📊 Technical Decisions (MVP Philosophy)

**Why ZIP instead of multiple files?**

- Cleaner uploads
- Lower request overhead
- Better scalability

**Why server-side processing?**

- No user dependency on Python
- Works for non-technical users
- Consistent output quality

**Why SQLite for counter?**

- Zero external dependency
- Persistent across restarts
- Simple and reliable for MVP

## ⚠️ Known Limitations (Intentional for MVP)

- No real-time progress tracking
- No background job queue
- Counter resets if full redeploy occurs
- Render free tier may cold start
- Large ZIP files may hit platform limits

These are acceptable tradeoffs for MVP scope.

## 🔮 Future Improvements

- Background processing with task queue (Celery / RQ)
- Redis-backed persistent analytics
- Upload progress tracking
- Async job polling system
- Image resolution customization
- Frame sampling controls
- Real-time multi-user counter updates (WebSockets)

## 📌 Why This Project Exists

The original concept required users to run Python locally.
This MVP shifts the experience to a cloud-based model so anyone can use it — technical or not.

The goal was to build a clean, production-deployable, minimal system with proper architecture separation.

## 🧾 License

MIT License