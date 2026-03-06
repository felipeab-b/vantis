from fastapi import FastAPI

app = FastAPI(
    title="Vantis API",
    description="Attack surface intelligence platform",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"message": "Vantis API is running"}

@app.get("api/health")
def checkHealth():
    return {"status": "ok"}