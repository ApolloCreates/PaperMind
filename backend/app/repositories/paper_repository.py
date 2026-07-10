from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.paper import Paper


class PaperRepository:

    def create(
        self,
        db: Session,
        paper: Paper,
    ) -> Paper:
        db.add(paper)
        db.commit()
        db.refresh(paper)
        return paper

    def update(
        self,
        db: Session,
        paper: Paper,
    ) -> Paper:
        db.add(paper)
        db.commit()
        db.refresh(paper)
        return paper

    def list_all(
        self,
        db: Session,
    ) -> list[Paper]:
        stmt = (
            select(Paper)
            .order_by(Paper.created_at.desc())
        )

        return db.execute(stmt).scalars().all()

    def list_by_project(
        self,
        db: Session,
        project_id: str,
    ) -> list[Paper]:
        stmt = (
            select(Paper)
            .where(Paper.project_id == project_id)
            .order_by(Paper.created_at.desc())
        )

        return db.execute(stmt).scalars().all()

    def get(
        self,
        db: Session,
        paper_id: str,
    ) -> Paper | None:
        stmt = select(Paper).where(Paper.id == paper_id)

        return db.execute(stmt).scalar_one_or_none()

    def delete(
        self,
        db: Session,
        paper: Paper,
    ) -> None:
        db.delete(paper)
        db.commit()
        
    def get_full_text(
        self,
        db: Session,
        paper_id: str,
    ) -> str | None:

        paper = self.get(db, paper_id)

        if paper is None:
            return None

        return paper.full_text