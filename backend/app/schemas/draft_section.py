from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import (
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class DraftSectionType(str, Enum):

    ABSTRACT = "Abstract"

    INTRODUCTION = "Introduction"

    RELATED_WORK = "Related Work"

    METHODOLOGY = "Methodology"

    EXPERIMENTS = "Experiments"

    RESULTS = "Results"

    DISCUSSION = "Discussion"

    CONCLUSION = "Conclusion"


class DraftSection(Base):

    __tablename__ = "draft_sections"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    draft_id: Mapped[str] = mapped_column(
        ForeignKey("drafts.id"),
        nullable=False,
    )

    section: Mapped[DraftSectionType] = mapped_column(
        SqlEnum(DraftSectionType),
    )

    content: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )