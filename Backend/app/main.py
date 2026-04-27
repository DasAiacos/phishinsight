from fastapi import FastAPI
from app.routes import phishing
from app.db.database import Base, engine
from app.db.database import SessionLocal
from app.db.models import PhishingEvent
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.ingest import run_ingestion
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PhishInsight API",
    description="API para análisis de eventos de phishing basada en arquitectura SOA",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scheduler = BackgroundScheduler()
# Job programado para ejecutar la ingesta cada hora
def scheduled_ingest():
    db = SessionLocal()
    try:
        print("Ejecutando ingesta automática...")
        run_ingestion(db)
    finally:
        db.close()

scheduler.add_job(scheduled_ingest, "interval", minutes=60)

# Carga inicial de datos al iniciar la aplicación
@app.on_event("startup")
def startup_event():
    print("Ejecutando ingesta inicial...")
    
    db = SessionLocal()
    try:
        run_ingestion(db)
    finally:
        db.close()

    scheduler.start()


# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)


# Health check
@app.get("/health-check")
def healthCheck():
    return {"message": "PhishInsight API funcionando correctamente"}

# Endpoint debug (ver datos)
@app.get("/data")
def get_data(limit: int = 10):
    db = SessionLocal()
    try:
        results = db.query(PhishingEvent).limit(limit).all()

        return [
            {
                "id": r.id,
                "external_id": r.external_id,
                "url": r.url,
                "domain": r.domain,
                "country_code": r.country_code,
                "country_name": r.country_name,
                "city": r.city,
                "score": r.score,
                "date_detected": r.date_detected,
                "created_at": r.created_at
            }
            for r in results
        ]
    finally:
        db.close()


# Registrar rutas de phishing
app.include_router(phishing.router)