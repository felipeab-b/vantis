import asyncio
from fastapi import APIRouter, HTTPException
from app.config import settings
from app.services.ipinfo import get_ip_info
from app.services.shodan import get_host_info
from app.services.virustotal import get_ip_report
from app.services.hibp import get_breaches
from app.services.claude import analyze_report
from app.db.mongo import get_cached_report, save_report

router = APIRouter()

@router.get("/search")
async def search(query: str):
    try:
        cached = await get_cached_report(query)
        if cached:
            print(f"Cache hit for {query}")
            return cached

        tasks = [
            get_ip_info(query),
            get_host_info(query),
            get_ip_report(query),
        ]

        if settings.HIBP_API_KEY:
            tasks.append(get_breaches(query))

        results = await asyncio.gather(*tasks, return_exceptions=True)

        ip_data = results[0] if not isinstance(results[0], Exception) else {}
        shodan_data = results[1] if not isinstance(results[1], Exception) else {}
        vt_data = results[2] if not isinstance(results[2], Exception) else {}
        breaches = results[3] if len(results) > 3 and not isinstance(results[3], Exception) else []

        report_data = {
            "ip_info": ip_data,
            "shodan": shodan_data,
            "virustotal": vt_data,
            "breaches": breaches
        }

        ai_analysis = await analyze_report(report_data)

        result = {
            "query": query,
            "ai_analysis": ai_analysis,
            "ip_info": ip_data,
            "shodan": shodan_data,
            "virustotal": vt_data,
            "breaches": breaches
        }

        await save_report(query, result)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))