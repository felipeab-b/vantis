from fastapi import FastAPI
from app.db.mongo import connect_db, close_db
from app.api.routes.search import router as search_router

app = FastAPI(
    title="Vantis API",
    description="Attack surface intelligence platform",
    version="0.1.0"
)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

app.include_router(search_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Vantis API is running"}

@app.get("/api/health")
def checkHealth():
    return {"status": "ok"}