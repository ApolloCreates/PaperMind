from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base_class import Base


class LiteratureReview(Base):

    __tablename__ = "literature_reviews"

    id: Mapped[str] = mapped_column(
        primary_key=True,
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.id"),
    )

    content: Mapped[str] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
    )