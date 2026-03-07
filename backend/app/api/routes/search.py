from fastapi import APIRouter, HTTPException
from app.services.ipinfo import get_ip_info
from app.services.shodan import get_host_info
from app.services.virustotal import get_ip_report
from app.services.hibp import get_breaches
from app.config import settings

router = APIRouter()

@router.get("/search")
async def search(query: str):
    try:
        ip_data = await get_ip_info(query)
        shodan_data = await get_host_info(query)
        vt_data = await get_ip_report(query)

        breaches = []
        if settings.HIBP_API_KEY:
            breaches = get_breaches(query)

        return {
            "query": query, 
            "ip_info": ip_data,
            "shodan": shodan_data,
            "virustotal": vt_data,
            "breaches": breaches
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))