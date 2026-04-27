from datetime import datetime

def parse_date(date_str):
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except:
        return None
    
def validate(data):
    return [d for d in data if "url" in d]

def clean(data):
    for d in data:
        d["url"] = d["url"].strip()
    return data

def enrich(data):
    for d in data:
        d["countrycode"] = d.get("countrycode", "NA")
        d["countryname"] = d.get("countryname", "Unknown")
        d["city"] = d.get("city", "Unknown")
        d["score"] = int(d.get("score", 0))
        d["date"] = parse_date(d.get("date"))
    return data

def process_data(data):
    data = validate(data)
    data = clean(data)
    data = enrich(data)
    return data