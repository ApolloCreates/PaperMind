from app.agents.paper_writer_agent import (
    PaperWriterAgent,
)
from app.services.retrieval_service import (
    RetrievalService,
)


class PaperWriterService:

    def __init__(self):

        self.agent = PaperWriterAgent()
        self.retrieval = RetrievalService()

    def generate(
        self,
        project_id: str,
        topic: str,
        section: str,
        instructions: str | None,
    ):

        context = self.retrieval.retrieve_for_project(
            project_id=project_id,
            query=f"{topic} {section}",
            limit=8,
        )

        if not context:
            raise ValueError(
                "No relevant papers found."
            )

        return self.agent.generate(
            context=context,
            topic=topic,
            section=section,
            instructions=instructions,
        )