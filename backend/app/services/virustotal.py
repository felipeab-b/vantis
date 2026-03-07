import httpx
from app.config import settings

BASE_URL = "https://www.virustotal.com/api/v3"

async def get_ip_report(ip: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/ip_addresses/{ip}",
            headers={"x-apikey": settings.VIRUSTOTAL_API_KEY}
        )
        response.raise_for_status()
        return response.json()
    