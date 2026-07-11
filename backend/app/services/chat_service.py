from sqlalchemy.orm import Session

from app.agents.chat_agent import ChatAgent
from app.repositories.paper_repository import PaperRepository
from app.services.retrieval_service import RetrievalService


class ChatService:

    def __init__(self):
        self.repo = PaperRepository()
        self.agent = ChatAgent()
        self.retrieval = RetrievalService()

    def ask(
        self,
        db: Session,
        paper_id: str,
        question: str,
    ) -> str:

        paper = self.repo.get(
            db,
            paper_id,
        )

        if paper is None:
            raise ValueError("Paper not found.")

        context = self.retrieval.retrieve_for_paper(
            paper_id=paper_id,
            query=question,
        )

        if not context:
            raise ValueError(
                "No relevant context found."
            )

        return self.agent.ask(
            context,
            question,
        )