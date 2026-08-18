from app.agents.topic_generation_agent import TopicGenerationAgent
from app.services.retrieval_service import RetrievalService


class TopicGenerationService:

    def __init__(self):
        self.agent = TopicGenerationAgent()
        self.retrieval = RetrievalService()

    def generate(
        self,
        project_id: str,
        paper_ids: list[str],
        research_area: str,
    ) -> str:

        if not paper_ids:
            raise ValueError("Please select at least one paper.")

        context = self.retrieval.retrieve_multiple_papers(
            paper_ids=paper_ids,
            query=research_area,
            chunks_per_paper=2,
        )

        if not context:
            raise ValueError("No relevant papers found.")

        return self.agent.generate(
            context=context,
            research_area=research_area,
        )