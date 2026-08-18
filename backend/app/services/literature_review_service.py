from app.agents.literature_review_agent import LiteratureReviewAgent
from app.services.retrieval_service import RetrievalService


class LiteratureReviewService:

    def __init__(self):
        self.agent = LiteratureReviewAgent()
        self.retrieval = RetrievalService()

    def generate(
        self,
        project_id: str,
        topic: str | None = None,
    ) -> str:

        query = topic or "Summarize all uploaded research papers."

        context = self.retrieval.retrieve_for_project(
            project_id=project_id,
            query=query,
            limit=5,
        )

        if not context:
            raise ValueError("No relevant papers found.")

        return self.agent.generate(
            context=context,
            topic=topic or "General Literature Review",
        )