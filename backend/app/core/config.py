from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    app_name: str = "ResearchAI API"
    app_version: str = "1.0.0"

    environment: str = "development"
    debug: bool = True

    host: str = "0.0.0.0"
    port: int = 8000

    algorithm: str = "HS256"

    access_token_expire_minutes: int = 30

    postgres_user: str = "researchai"
    postgres_password: str = "researchai"
    postgres_db: str = "researchai"
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    redis_host: str = "localhost"
    redis_port: int = 6379

    qdrant_host: str = "localhost"
    qdrant_port: int = 6333

    minio_host: str = "localhost"
    minio_port: int = 9000

    minio_root_user: str = "researchai"
    minio_root_password: str = "researchai123"

    secret_key: str = "dev-secret-key"

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