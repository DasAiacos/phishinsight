from fastapi import APIRouter, Depends, HTTPException
from app.db.database import SessionLocal
from app.services.ingest import run_ingestion
from app.core.auth import verify_api_key
from app.services.query_service import (
    get_recent,
    search_phishing,
    get_stats,
    get_data,
    get_top_countries
)
router = APIRouter(
    dependencies=[Depends(verify_api_key)],
    prefix="/phishing", tags=["Phishing"]
)

@router.get("/recent")
def recent(limit: int = 10):
    db = SessionLocal()
    try:
        data = get_recent(db, limit)
        return data
    finally:
        db.close()

@router.get("/search")
def search(domain: str = None, country: str = None, score: float = None):
    db = SessionLocal()
    try:
        data = search_phishing(db, domain, country, score)
        return data
    finally:
        db.close()

@router.get("/stats")
def stats():
    db = SessionLocal()
    try:
        return get_stats(db)
    finally:
        db.close()

@router.post("/ingest")
def ingest():
    db = SessionLocal()
    try:
        result = run_ingestion(db)
        return result
    finally:
        db.close()

@router.get("/data")
def get_data_endpoint(limit: int = 10):
    db = SessionLocal()
    try:
        return get_data(db, limit)
    finally:
        db.close()

@router.get("/top-countries")
def get_top_countries_endpoint(limit: int = 10):
    db = SessionLocal()
    try:
        return get_top_countries(db, limit)
    finally:
        db.close()