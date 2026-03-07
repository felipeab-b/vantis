from fastapi import APIRouter, HTTPException
from app.services.ipinfo import get_ip_info
from app.services.shodan import get_host_info
from app.services.virustotal import get_ip_report

router = APIRouter()

@router.get("/search")
async def search(query: str):
    try:
        ip_data = await get_ip_info(query)
        shodan_data = await get_host_info(query)
        vt_data = await get_ip_report(query)

        return {
            "query": query, 
            "ip_info": ip_data,
            "shodan": shodan_data,
            "virustotal": vt_data
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))