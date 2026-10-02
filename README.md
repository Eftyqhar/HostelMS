# HostelMS — College Hostel Management System (Full-Stack)

A complete college hostel management system built to match both the **Admin Management Dashboard** and the **Student Portal (Rahim Ahmed)** UI designs with a **FastAPI + SQLite** backend.

---

## 🏗️ Architecture

```
Hostel_management/
├── server/                     # FastAPI Backend (Python)
│   ├── database.py             # SQLite schema and automatic initial seed
│   ├── models.py               # Pydantic data validation models
│   ├── main.py                 # REST API endpoints & CORS middleware
│   ├── hostel.db               # SQLite database file
│   └── requirements.txt        # Backend dependencies
├── src/                        # React Frontend (TypeScript)
│   ├── components/
│   │   ├── admin/              # Admin dashboard widgets & layouts
│   │   ├── student/            # Student portal widgets & layouts
│   │   ├── common/             # Header, Sidebar, Modal, Toast
│   │   └── modals/             # Action dialogs (Add Student, Assign Room, Pay, etc.)
│   ├── context/
│   │   └── HostelContext.tsx   # Global state synced with FastAPI backend & localStorage
│   ├── services/
│   │   └── api.ts              # REST client for backend communication
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main layout & role orchestrator
│   └── index.css               # Tailwind CSS v4 styling
└── package.json
```

---

## ⚡ Quick Start

### 1. Run Backend (FastAPI on Port 8000)
```powershell
# Using the pre-configured npm script:
npm run server

# Or directly with Python:
.\server\venv\Scripts\uvicorn server.main:app --reload --port 8000
```
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc API Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 2. Run Frontend (React + Vite on Port 5173)
```powershell
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/stats` | Top-level KPI counts and occupancy percentages |
| `GET` | `/api/students` | Get all students (supports sorting/filtering) |
| `POST` | `/api/students` | Register new student admission |
| `GET` | `/api/rooms` | Get rooms layout with bed occupancy mapping |
| `POST` | `/api/rooms/assign` | Assign student to room & bed slot |
| `GET` | `/api/complaints` | Get complaints (all or filtered by student) |
| `POST` | `/api/complaints` | Submit a maintenance or room repair complaint |
| `PATCH`| `/api/complaints/{id}/status` | Advance status (`Pending` ➔ `In Progress` ➔ `Resolved`) |
| `GET` | `/api/payments` | Get payment records |
| `POST` | `/api/payments` | Record fee payment with transaction ID |
| `GET` | `/api/meals` | Today's meal menu & student attendance |
| `PATCH`| `/api/meals/{type}/toggle` | Toggle breakfast/lunch/dinner checkmark |
| `GET` | `/api/visitors` | List of today's visitors and gate passes |
| `POST` | `/api/visitors` | Issue guest visitor pass |
| `GET` | `/api/attendance` | Night roll-call attendance history |
| `GET` | `/api/notices` | Official hostel announcements |
| `GET` | `/api/activities` | Real-time audit activity feed |

---

## 🎨 Dual Portal Views

1. **Admin Portal**: Full control over student admissions, room layouts, bed allocations, complaint tracking, payment collection, and visitors.
2. **Student Portal (Rahim Ahmed)**: Personalized dashboard displaying assigned room, bed number, room photo, payment history with printable PDF receipts, interactive meal checklist, and gate pass requests.
