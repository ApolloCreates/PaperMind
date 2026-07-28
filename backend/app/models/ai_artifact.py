from datetime import datetime
from uuid import uuid4

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    Text,
    Enum,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base
from app.core.artifact_types import ArtifactType


class AIArtifact(Base):

    __tablename__ = "ai_artifacts"

    id: Mapped[str] = mapped_column(
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.id"),
    )

    artifact_type: Mapped[ArtifactType] = mapped_column(
        Enum(ArtifactType),
    )

    version: Mapped[int] = mapped_column(
        Integer,
    )

    prompt: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    content: Mapped[str] = mapped_column(
        Text,
    )

    metadata: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )