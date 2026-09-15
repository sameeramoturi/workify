from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

from services.haversine import filter_workers_by_radius, calculate_haversine_distance
from services.elo_engine import update_elo_ratings
from services.recommender import rank_workers

app = FastAPI(
    title="Workify AI Matching & Recommendation Service",
    description="Microservice providing Elo matchmaking, Haversine geospatial proximity, and worker recommendation ranking.",
    version="1.0.0"
)

# Enable CORS for Frontend & Backend services
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------------
# Pydantic Schemas
# ------------------------------------------------------------------------------
class WorkerCandidate(BaseModel):
    id: int
    name: str
    category: str
    skills: List[str]
    latitude: float
    longitude: float
    rating: float = 4.5
    review_count: int = 0
    experience_years: int = 3
    hourly_rate: float = 400.0
    elo_rating: float = 1500.0
    availability_status: str = "AVAILABLE" # AVAILABLE, BUSY, OFFLINE
    is_verified: bool = True

class RecommendationRequest(BaseModel):
    customer_latitude: float
    customer_longitude: float
    service_category: str
    required_skill: str = ""
    max_radius_km: float = 10.0
    preferred_budget: Optional[float] = None
    candidate_workers: List[WorkerCandidate]

class DistanceCheckRequest(BaseModel):
    lat1: float
    lon1: float
    lat2: float
    lon2: float

class EloUpdateRequest(BaseModel):
    worker_elo: float = 1500.0
    customer_elo: float = 1500.0
    ses_score: float = Field(..., ge=0.0, le=1.0, description="Servicer Effort Score (0.0 - 1.0)")
    cbs_score: float = Field(..., ge=0.0, le=1.0, description="Customer Behaviour Score (0.0 - 1.0)")

# ------------------------------------------------------------------------------
# Routes
# ------------------------------------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Workify AI & ML Recommendation Engine",
        "version": "1.0.0"
    }

@app.post("/distance")
def get_distance(req: DistanceCheckRequest):
    dist = calculate_haversine_distance(req.lat1, req.lon1, req.lat2, req.lon2)
    return {"distance_km": dist}

@app.post("/recommend")
def recommend_workers(req: RecommendationRequest):
    """
    Filters available workers within radius (10km default) and ranks them
    by distance, Elo, rating, experience, and skill fit.
    """
    workers_dict_list = [w.dict() for w in req.candidate_workers]
    ranked = rank_workers(
        customer_lat=req.customer_latitude,
        customer_lon=req.customer_longitude,
        required_skill=req.required_skill or req.service_category,
        workers=workers_dict_list,
        max_radius_km=req.max_radius_km,
        preferred_budget=req.preferred_budget
    )
    return {
        "count": len(ranked),
        "workers": ranked
    }

@app.post("/elo/update")
def update_elo(req: EloUpdateRequest):
    """
    Updates Elo ratings for Worker and Customer based on post-job feedback.
    """
    result = update_elo_ratings(
        worker_elo=req.worker_elo,
        customer_elo=req.customer_elo,
        ses_score=req.ses_score,
        cbs_score=req.cbs_score
    )
    return result
