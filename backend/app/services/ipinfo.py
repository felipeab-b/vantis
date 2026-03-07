import httpx
from app.config import settings

BASE_URL = "https://ipinfo.io"

async def get_ip_info(ip: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/{ip}/json",
            params={"token": settings.IPINFO_API_KEY}
        )
        response.raise_for_status()
        return response.json()        