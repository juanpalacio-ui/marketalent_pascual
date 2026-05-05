from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Marketalent API"
    DATABASE_URL: str = "postgresql+pg8000://myuser:mypassword@localhost:5432/marketalent"
    
    class Config:
        env_file = ".env"

settings = Settings()
