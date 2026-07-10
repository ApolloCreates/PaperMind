from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository


class ProjectService:

    def __init__(self):

        self.repo = ProjectRepository()

    def create_project(
        self,
        db: Session,
        name: str,
        description: str | None,
    ):
        return self.repo.create(
            db,
            name,
            description,
        )

    def list_projects(
        self,
        db: Session,
    ):
        return self.repo.get_all(db)

    def get_project(
        self,
        db: Session,
        project_id: str,
    ):
        return self.repo.get(db, project_id)

    def delete_project(
        self,
        db: Session,
        project,
    ):
        self.repo.delete(db, project)