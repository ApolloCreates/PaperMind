from sqlalchemy.orm import Session

from app.agents.summary_agent import SummaryAgent
from app.repositories.paper_repository import PaperRepository
from app.services.retrieval_service import RetrievalService


class SummaryService:

    def __init__(self):
        self.repo = PaperRepository()
        self.agent = SummaryAgent()
        self.retrieval = RetrievalService()

    def summarize(
        self,
        db: Session,
        paper_id: str,
    ) -> str:

        paper = self.repo.get(
            db,
            paper_id,
        )

        if paper is None:
            raise ValueError("Paper not found.")

        context = self.retrieval.retrieve_for_paper(
            paper_id=paper_id,
            query="Provide a comprehensive summary of this paper.",
        )

        if not context:
            raise ValueError(
                "No context found."
            )

        return self.agent.summarize(
            context,
        )