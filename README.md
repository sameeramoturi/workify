# Workify — Skilled Workers. Better Tomorrow.
> **On-Demand Worker Availability & At-Door Service Delivery Platform**

![Workify](https://img.shields.io/badge/Architecture-Three--Tier-blue)
![Docker](https://img.shields.io/badge/Containerization-Docker%20Compose-2496ED)
![Backend](https://img.shields.io/badge/Backend-Django%20REST%20Framework-092E20)
![ML](https://img.shields.io/badge/ML%20Service-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB)
![Cloud](https://img.shields.io/badge/Cloud-AWS%20(EC2%2C%20RDS%2C%20S3)-FF9900)

---

## 📌 Project Overview

**Workify** connects customers with nearby, verified blue-collar and skilled workers (plumbers, electricians, carpenters, painters, AC technicians, mechanics) in real time.

### Core Matchmaking & AI Process:
1. **Real-time Status**: Workers toggle **Available / Busy / Offline**.
2. **Haversine Distance Filter**: The system calculates spherical distance and limits matching to a **10 km radius** (e.g., across Rajahmundry & surrounding areas).
3. **AI Recommendation & Ranking**: Candidate workers are scored and ranked using composite metrics:
   - Geospatial proximity (Haversine formula)
   - Elo rating (derived from Servicer Effort Score & Customer Behaviour Score)
   - Star ratings and total review counts
   - Experience and skill matches
4. **KYC Verification**: Admins review and approve uploaded ID documents (stored in **AWS S3**) before granting the verified badge.

---

## 👥 Team Workspaces & Roles

| Role | Teammate | Assigned Workspace & Scope |
| :--- | :--- | :--- |
| **Full Stack 1** | Person 1 | **Customer Flow**: `frontend/src/pages/customer/` (Landing, Search, Job Posting), `backend/apps/jobs/`, `backend/apps/reviews/` |
| **Full Stack 2** | Person 2 | **Worker & Admin Flow**: `frontend/src/pages/worker/`, `frontend/src/pages/admin/`, `backend/apps/workers/`, `backend/apps/authentication/` |
| **GenAI / ML** | Person 3 | **AI & Matchmaking Engine**: `ml-service/` (FastAPI, Haversine filter, Elo engine, Collaborative filtering) |
| **AWS / DevOps ⭐** | **YOU** | **Infrastructure & Pipelines**: `docker-compose.yml`, `devops/`, `.github/workflows/`, AWS Cloud Architecture (EC2, RDS, S3, IAM, CloudWatch) |

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)
- Git

### 2. Clone & Start All Services
```bash
# Clone the repository
git clone <repo-url>
cd "worker availability system project"

# Copy environment template
cp .env.example .env

# Build and start all 5 containers (Postgres, Redis, Django, FastAPI, React)
docker compose up --build
```

### 3. Seed Sample Data (From UI Mockups)
In a separate terminal, seed the database with initial workers (Ramesh Das, Amit Verma, Suresh Yadav, etc.) and customer profile:
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_data
```

---

## 🌐 Service Endpoints

| Service | Local URL | Description |
| :--- | :--- | :--- |
| **Frontend App** | `http://localhost:3000` | React web application (Customer, Worker, Admin portals) |
| **Backend Core API** | `http://localhost:8000/api/` | Django REST Framework API endpoints |
| **Django Admin** | `http://localhost:8000/admin/` | Admin database management portal |
| **ML Microservice** | `http://localhost:5001` | FastAPI recommendation & Elo engine |
| **ML Swagger API Docs** | `http://localhost:5001/docs` | Interactive OpenAPI documentation for ML algorithms |

---

## ☁️ AWS Cloud Architecture (DevOps Blueprint)

```
                       Internet
                          │
                   [ Route 53 (DNS) ]
                          │
              [ Application Load Balancer / SSL ]
                          │
         ┌────────────────┴────────────────┐
         │ VPC (ap-south-1)                │
         │                                 │
         │  [ EC2 Instance / Docker ]      │
         │   ├── workify_frontend (Nginx)  │
         │   ├── workify_backend (Django)  │
         │   ├── workify_ml_service (FastAPI)
         │   └── workify_redis             │
         │                                 │
         │  [ AWS RDS (PostgreSQL 15) ]    │ (Private Subnet)
         │                                 │
         │  [ AWS S3 Storage Bucket ]      │ (KYC documents, gallery photos)
         │                                 │
         │  [ AWS CloudWatch ]             │ (Logs, CPU/RAM alarms)
         └─────────────────────────────────┘
```

1. **Amazon EC2**: Runs the containerized application stack using Docker Compose.
2. **Amazon RDS (PostgreSQL)**: Multi-AZ managed relational database for production reliability and automated backups.
3. **Amazon S3**: Secure object storage with pre-signed URLs for KYC identification proofs, profile pictures, and job attachments.
4. **AWS IAM**: Role-based access control granting least-privilege permissions for EC2 to write to S3 and CloudWatch.
5. **AWS CloudWatch**: Collects container logs, monitors server metrics (CPU, RAM, Disk I/O), and triggers alarms.
6. **GitHub Actions CI/CD**: Automatically runs linters, unit tests, and validates Docker builds on every Pull Request.
