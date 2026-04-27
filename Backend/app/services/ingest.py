import requests
from sqlalchemy.orm import Session
from app.db.models import PhishingEvent
from app.services.pipeline import process_data

PHISHSTATS_API = "https://api.phishstats.info/api/phishing?_size=100" 

def fetch_data():
    try:
        response = requests.get(PHISHSTATS_API, timeout=10)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print("Error al consumir API:", e)
    return []

def save_to_db(db: Session, data):
    inserted = 0

    for item in data:
        # evitar duplicados por URL
        exists = db.query(PhishingEvent).filter_by(url=item["url"]).first()
        if not exists:
            event = PhishingEvent(
                external_id=item.get("id"),
                url=item["url"],
                domain=item.get("domain"),
                country_code=item.get("countrycode"),
                country_name=item.get("countryname"),
                city=item.get("city"),
                score=item.get("score"),
                date_detected=item.get("date")
            )
            db.add(event)
            inserted += 1

    db.commit()
    return inserted

def run_ingestion(db: Session):
    raw_data = fetch_data()
    processed_data = process_data(raw_data)
    inserted = save_to_db(db, processed_data)
    return {"inserted": inserted, "total": len(processed_data)}