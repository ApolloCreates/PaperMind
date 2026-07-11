from app.agents.topic_generation_agent import (
    TopicGenerationAgent,
)
from app.services.retrieval_service import (
    RetrievalService,
)


class TopicGenerationService:

    def __init__(self):
        self.agent = TopicGenerationAgent()
        self.retrieval = RetrievalService()

    def generate(
        self,
        project_id: str,
        research_area: str,
    ) -> str:

        context = self.retrieval.retrieve_for_project(
            project_id=project_id,
            query=research_area,
            limit=8,
        )

        if not context:
            raise ValueError(
                "No relevant papers found."
            )

        return self.agent.generate(
            context=context,
            research_area=research_area,
        )