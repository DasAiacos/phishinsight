from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime, timezone
from app.db.database import Base

class PhishingEvent(Base):
    __tablename__ = "phishing_events"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, nullable=True)
    url = Column(String(500), index=True)
    domain = Column(String(255))
    country_code = Column(String(10))
    country_name = Column(String(100))
    city = Column(String(100))
    score = Column(Float)
    date_detected = Column(DateTime)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))