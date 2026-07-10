from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    app_name: str = "ResearchAI API"
    app_version: str = "1.0.0"

    environment: str = "development"
    debug: bool = True

    host: str = "0.0.0.0"
    port: int = 8000

    secret_key: str
    algorithm: str = "HS256"

    access_token_expire_minutes: int = 30

    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_host: str
    postgres_port: int

    redis_host: str
    redis_port: int

    qdrant_host: str
    qdrant_port: int

    minio_root_user: str
    minio_root_password: str

    openai_api_key: str | None = None
    anthropic_api_key: str | None = None
    google_api_key: str | None = None
    groq_api_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()