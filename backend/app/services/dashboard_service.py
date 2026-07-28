from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository
from app.repositories.paper_repository import PaperRepository
from app.repositories.draft_repository import DraftRepository


from app.core.project_metrics import (
    calculate_progress,
    calculate_status,
)


class DashboardService:

    def __init__(self):

        self.project_repo = ProjectRepository()

        self.paper_repo = PaperRepository()

        self.draft_repo = DraftRepository()

    def list_projects(
        self,
        db: Session,
    ):

        projects = self.project_repo.get_all(db)

        result = []

        for project in projects:

            paper_count = self.paper_repo.count_by_project(
                db,
                project.id,
            )

            draft_count = self.draft_repo.count_by_project(
                db,
                project.id,
            )

            review_count = 0

            progress = calculate_progress(
                paper_count,
                draft_count,
                review_count,
            )

            status = calculate_status(
                paper_count,
                draft_count,
                review_count,
            )

            result.append(
                {
                    "id": project.id,
                    "name": project.name,
                    "description": project.description,
                    "papers": paper_count,
                    "drafts": draft_count,
                    "reviews": review_count,
                    "progress": progress,
                    "status": status,
                    "last_activity": project.updated_at,
                }
            )

        return result
    
    def get_stats(
        self,
        db: Session,
    ):

        return {
            "total_projects": self.project_repo.count(db),
            "total_papers": self.paper_repo.count(db),
            "total_drafts": self.draft_repo.count(db),
            "total_reviews": 0,
        }
        
    def get_project(
        self,
        db: Session,
        project_id: str,
    ):

        project = self.project_repo.get(
            db,
            project_id,
        )

        if project is None:
            raise ValueError(
                "Project not found."
            )

        papers = self.paper_repo.count_by_project(
            db,
            project.id,
        )

        drafts = self.draft_repo.count_by_project(
            db,
            project.id,
        )

        reviews = 0

        progress = 0

        if papers > 0:
            progress += 40

        if drafts > 0:
            progress += 40

        if reviews > 0:
            progress += 20

        if papers == 0:
            status = "NEW"

        elif drafts == 0:
            status = "RESEARCH"

        elif reviews == 0:
            status = "WRITING"

        else:
            status = "READY"

        return {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "papers": papers,
            "drafts": drafts,
            "reviews": reviews,
            "progress": progress,
            "status": status,
            "created_at": project.created_at,
            "updated_at": project.updated_at,
        }