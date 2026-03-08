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

async def get_cached_report(query: str) -> dict | None:
    collection = db["reports"]
    doc = await collection.find_one({"query": query})
    if not doc:
        return None
    age = datetime.now(timezone.utc) - doc["cached_at"]
    if age > timedelta(hours=24):
        await collection.delete_one({"query": query})
        return None
    return doc["data"]

async def save_report(query: str, data: dict):
    collection = db["reports"]
    await collection.replace_one(
        {"query": query},
        {
            "query": query,
            "data": data,
            "cached_at": datetime.now(timezone.utc)
        },
        upsert=True
    )