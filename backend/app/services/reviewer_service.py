from sqlalchemy.orm import Session

from app.agents.reviewer_agent import ReviewerAgent
from app.repositories.draft_repository import DraftRepository
from app.repositories.draft_section_repository import (
    DraftSectionRepository,
)


class ReviewerService:

    def __init__(self):
        self.agent = ReviewerAgent()
        self.draft_repo = DraftRepository()
        self.section_repo = DraftSectionRepository()

    def review(
        self,
        db: Session,
        draft_id: str,
    ) -> str:

        draft = self.draft_repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError("Draft not found.")

        sections = self.section_repo.list_sections(
            db,
            draft_id,
        )

        if not sections:
            raise ValueError("Draft has no sections.")

        paper = ""

        for section in sections:

            paper += (
                f"# {section.section.value}\n\n"
                f"{section.content}\n\n"
            )

        return self.agent.review(paper)