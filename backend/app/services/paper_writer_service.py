from sqlalchemy.orm import Session

from app.agents.paper_writer_agent import PaperWriterAgent
from app.core.constants import SECTION_ORDER
from app.models.draft_section import (
    DraftSection,
    DraftSectionType,
)
from app.repositories.draft_repository import DraftRepository
from app.repositories.draft_section_repository import (
    DraftSectionRepository,
)
from app.services.retrieval_service import RetrievalService


class PaperWriterService:

    def __init__(self):

        self.agent = PaperWriterAgent()
        self.retrieval = RetrievalService()
        self.draft_repo = DraftRepository()
        self.section_repo = DraftSectionRepository()

    def generate(
        self,
        db: Session,
        draft_id: str,
        section: DraftSectionType,
        instructions: str | None,
    ) -> DraftSection:

        draft = self.draft_repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError(
                "Draft not found."
            )

        topic = draft.topic

        previous_sections = self.section_repo.list_sections(
            db,
            draft_id,
        )

        draft_context = ""

        for item in previous_sections:

            if item.section == section:
                continue

            draft_context += (
                f"# {item.section.value}\n\n"
                f"{item.content}\n\n"
            )

        retrieval = self.retrieval.retrieve_with_references(
            project_id=draft.project_id,
            query=f"{topic} {section.value}",
            limit=8,
        )

        context = retrieval["context"]

        references = retrieval["references"]

        if not context:
            raise ValueError(
                "No relevant papers found."
            )

        generated = self.agent.generate(
            context=context,
            references=references,
            draft_context=draft_context,
            topic=topic,
            section=section.value,
            instructions=instructions,
        )

        saved = self.section_repo.save_section(
            db=db,
            draft_id=draft_id,
            section=section,
            content=generated,
            display_order=SECTION_ORDER[section],
        )

        return saved