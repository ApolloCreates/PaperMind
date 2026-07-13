from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.draft import Draft


class DraftRepository:

    def create(
        self,
        db: Session,
        draft: Draft,
    ) -> Draft:

        db.add(draft)
        db.commit()
        db.refresh(draft)

        return draft

    def get(
        self,
        db: Session,
        draft_id: str,
    ) -> Draft | None:

        stmt = (
            select(Draft)
            .where(Draft.id == draft_id)
        )

        return db.execute(stmt).scalar_one_or_none()

    def list_by_project(
        self,
        db: Session,
        project_id: str,
    ) -> list[Draft]:

        stmt = (
            select(Draft)
            .where(Draft.project_id == project_id)
            .order_by(Draft.created_at.desc())
        )

        return db.execute(stmt).scalars().all()

    def delete(
        self,
        db: Session,
        draft: Draft,
    ):

        db.delete(draft)
        db.commit()
        
        
    def count_by_project(
        self,
        db: Session,
        project_id: str,
    ) -> int:

        return (
            db.query(Draft)
            .filter(Draft.project_id == project_id)
            .count()
        )
        
    def count(
        self,
        db: Session,
    ) -> int:

        return (
            db.query(Draft)
            .count()
        )