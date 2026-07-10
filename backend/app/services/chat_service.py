from sqlalchemy.orm import Session

from app.agents.chat_agent import ChatAgent
from app.repositories.paper_repository import PaperRepository


class ChatService:

    def __init__(self):
        self.repo = PaperRepository()
        self.agent = ChatAgent()

    def ask(
        self,
        db: Session,
        paper_id: str,
        question: str,
    ) -> str:

        text = self.repo.get_full_text(
            db,
            paper_id,
        )

        if not text:
            raise ValueError("Paper text not found.")

        return self.agent.ask(
            text,
            question,
        )