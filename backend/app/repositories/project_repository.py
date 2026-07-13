from sqlalchemy.orm import Session

from app.models.project import Project


class ProjectRepository:

    def create(
        self,
        db: Session,
        name: str,
        description: str | None,
    ) -> Project:

        project = Project(
            name=name,
            description=description,
        )

        db.add(project)
        db.commit()
        db.refresh(project)

        return project

    def get_all(
        self,
        db: Session,
    ) -> list[Project]:

        return (
            db.query(Project)
            .order_by(Project.created_at.desc())
            .all()
        )

    def get(
        self,
        db: Session,
        project_id: str,
    ) -> Project | None:

        return (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

    def delete(
        self,
        db: Session,
        project: Project,
    ):

        db.delete(project)
        db.commit()
        
        
    def count(
        self,
        db: Session,
    ) -> int:

        return (
            db.query(Project)
            .count()
        )