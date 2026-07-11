from app.agents.gap_agent import GapAgent
from app.services.retrieval_service import RetrievalService


class GapService:

    def __init__(self):
        self.agent = GapAgent()
        self.retrieval = RetrievalService()

    def analyze(
        self,
        project_id: str,
        topic: str,
    ) -> str:

        context = self.retrieval.retrieve_for_project(
            project_id=project_id,
            query=topic,
            limit=8,
        )

        if not context:
            raise ValueError("No relevant papers found.")

        return self.agent.analyze(
            context=context,
            topic=topic,
        )