from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import DateTime, Enum as SqlEnum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class PaperStatus(str, Enum):
    UPLOADING = "UPLOADING"
    PROCESSING = "PROCESSING"
    READY = "READY"
    FAILED = "FAILED"


class Paper(Base):
    __tablename__ = "papers"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    project_id: Mapped[str] = mapped_column(
    ForeignKey("projects.id"),
    nullable=False,
)

    filename: Mapped[str] = mapped_column(String)

    original_filename: Mapped[str] = mapped_column(String)

    storage_path: Mapped[str] = mapped_column(String)

    status: Mapped[PaperStatus] = mapped_column(
        SqlEnum(PaperStatus),
        default=PaperStatus.UPLOADING,
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