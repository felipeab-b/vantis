import httpx
from app.config import settings

BASE_URL = "https://api.shodan.io"

async def get_host_info(ip: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/shodan/host/{ip}",
            params={"token": settings.SHODAN_API_KEY}
        )
        response.raise_for_status()
        return response.json()    