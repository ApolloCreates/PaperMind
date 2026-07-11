from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.draft_section import (
    DraftSection,
    DraftSectionType,
)


class DraftSectionRepository:

    def get_section(
        self,
        db: Session,
        draft_id: str,
        section: DraftSectionType,
    ) -> DraftSection | None:

        stmt = (
            select(DraftSection)
            .where(DraftSection.draft_id == draft_id)
            .where(DraftSection.section == section)
        )

        return db.execute(stmt).scalar_one_or_none()

    def save_section(
        self,
        db: Session,
        draft_id: str,
        section: DraftSectionType,
        content: str,
        display_order: int,
    ) -> DraftSection:

        existing = self.get_section(
            db,
            draft_id,
            section,
        )

        if existing:

            existing.content = content

            db.commit()
            db.refresh(existing)

            return existing

        new_section = DraftSection(
            draft_id=draft_id,
            section=section,
            content=content,
            display_order=display_order,
        )

        db.add(new_section)
        db.commit()
        db.refresh(new_section)

        return new_section

    def list_sections(
        self,
        db: Session,
        draft_id: str,
    ) -> list[DraftSection]:

        stmt = (
            select(DraftSection)
            .where(DraftSection.draft_id == draft_id)
            .order_by(DraftSection.display_order)
        )

        return db.execute(stmt).scalars().all()

    def delete_section(
        self,
        db: Session,
        section: DraftSection,
    ):

        db.delete(section)
        db.commit()

    def delete_by_draft(
        self,
        db: Session,
        draft_id: str,
    ):

        sections = self.list_sections(
            db,
            draft_id,
        )

        for section in sections:
            db.delete(section)

        db.commit()