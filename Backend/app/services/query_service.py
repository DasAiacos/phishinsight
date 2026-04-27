from sqlalchemy.orm import Session
from app.db.models import PhishingEvent
from sqlalchemy import func

def get_recent(db: Session, limit: int = 50):
    return db.query(PhishingEvent)\
        .order_by(PhishingEvent.date_detected.desc())\
        .limit(limit)\
        .all()

def search_phishing(db: Session, domain=None, country=None, score=None):
    query = db.query(PhishingEvent)

    if domain:
        query = query.filter(PhishingEvent.domain.ilike(f"%{domain}%"))

    if country:
        query = query.filter(PhishingEvent.country_code == country)

    if score:
        query = query.filter(PhishingEvent.score >= score)

    return query.limit(50).all()

def get_stats(db: Session):
    total = db.query(func.count(PhishingEvent.id)).scalar()

    by_country = db.query(
        func.coalesce(PhishingEvent.country_name, "Unknown"),
        func.count(PhishingEvent.id)
    ).group_by(PhishingEvent.country_name).all()

    return {
        "total_events": total,
        "by_country": [
            {"country": c, "count": count}
            for c, count in by_country
        ]
    }

def get_data(db: Session, limit: int = 10):
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


def get_top_countries(db: Session, limit: int = 10):
    results = (
        db.query(
            func.coalesce(PhishingEvent.country_name, "Unknown"),
            func.count(PhishingEvent.id).label("count"),
           func.round(func.avg(PhishingEvent.score), 2).label("avg_score")
        )
        .group_by(PhishingEvent.country_name)
        .order_by(func.count(PhishingEvent.id).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "country_name": country,
            "count": count,
            "avg_score": avg_score
        }
        for country, count, avg_score in results
    ]