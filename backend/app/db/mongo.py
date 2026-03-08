from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
from datetime import datetime, timedelta, timezone

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    print("Connected to MongoDB")

async def close_db():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB")

def get_db():
    return db

def sanitize(obj):
    if isinstance(obj, dict):
        return {k: sanitize(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [sanitize(i) for i in obj]
    if isinstance(obj, float) and (obj > 2**53 or obj < -(2**53)):
        return str(obj)
    if isinstance(obj, int) and (obj > 2**63 - 1 or obj < -(2**63)):
        return str(obj)
    return obj

async def get_cached_report(query: str) -> dict | None:
    collection = db["reports"]
    doc = await collection.find_one({"query": query})

    if not doc:
        return None
    
    cached_at = doc["cached_at"]

    if cached_at.tzinfo is None:
        cached_at = cached_at.replace(tzinfo=timezone.utc)

    age = datetime.now(timezone.utc) - cached_at

    if age > timedelta(hours=24):
        await collection.delete_one({"query": query})
        return None
    
    return doc["data"]

async def save_report(query: str, data: dict):
    collection = db["reports"]

    clean_data = sanitize(data)
    
    await collection.replace_one(
        {"query": query},
        {
            "query": query,
            "data": clean_data,
            "cached_at": datetime.now(timezone.utc)
        },
        upsert=True
    )