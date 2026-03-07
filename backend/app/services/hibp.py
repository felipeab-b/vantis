import httpx
from app.config import settings

BASE_URL = ""

async def get_breaches(domain: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = client.get(
            f"{BASE_URL}/breaches",
            params={"domain": domain},
            headers={
                "hibp-api-key": settings.HIBP_API_KEY,
                "user-agent": "Vantis"
            }
        )

        if response.status_code == 404:
            return []

        response.raise_for_status()
        return response.json()    