from fastapi import Header, HTTPException

API_KEY = ">k_CDxd=u!s07>)"

def verify_api_key(x_api_key: str = Header(None)):
    if x_api_key is None:
        raise HTTPException(status_code=401, detail="API Key requerida")

    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="API Key inválida")