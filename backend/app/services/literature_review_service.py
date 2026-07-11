from sqlalchemy.orm import Session

from app.agents.literature_review_agent import LiteratureReviewAgent
from app.repositories.paper_repository import PaperRepository


class LiteratureReviewService:

    def __init__(self):
        self.repo = PaperRepository()
        self.agent = LiteratureReviewAgent()

    def generate(
        self,
        db: Session,
        paper_ids: list[str],
    ) -> str:

        papers = self.repo.get_by_ids(
            db,
            paper_ids,
        )

        if not papers:
            raise ValueError("No papers found.")

        context = "\n\n".join(
            paper.full_text or ""
            for paper in papers
        )

        return self.agent.generate(context)