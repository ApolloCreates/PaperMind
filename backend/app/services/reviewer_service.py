from sqlalchemy.orm import Session

from app.agents.reviewer_agent import ReviewerAgent
from app.repositories.paper_repository import PaperRepository


class ReviewerService:

    def __init__(self):
        self.agent = ReviewerAgent()
        self.repo = PaperRepository()

    def review(
        self,
        db: Session,
        paper_id: str | None,
        text: str | None,
    ) -> str:

        # Either paper_id OR text should be provided
        if bool(paper_id) == bool(text):
            raise ValueError(
                "Provide exactly one of 'paper_id' or 'text'."
            )

        if paper_id:

            paper = self.repo.get(
                db,
                paper_id,
            )

            if paper is None:
                raise ValueError(
                    "Paper not found."
                )

            text = paper.full_text

        if not text or not text.strip():
            raise ValueError(
                "No paper text provided."
            )

        return self.agent.review(text)