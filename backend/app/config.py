from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SHODAN_API_KEY: str = ""
    VIRUSTOTAL_API_KEY: str = ""
    IPINFO_API_KEY: str = ""
    HIBP_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    MONGODB_URL: str = "mongodb://mongo:27017"
    DATABASE_NAME: str = "vantis"

    class Config:
        env_file = ".env"

settings = Settings()