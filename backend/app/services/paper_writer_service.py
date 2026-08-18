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

        # --------------------------------------------------
        # 1. Get draft
        # --------------------------------------------------

        draft = self.draft_repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError(
                "Draft not found."
            )

        topic = draft.topic

        # --------------------------------------------------
        # 2. Use stored draft instructions
        #
        # Request instructions override stored instructions
        # if provided.
        # --------------------------------------------------

        final_instructions = (
            instructions
            if instructions and instructions.strip()
            else draft.instructions
        )

        # --------------------------------------------------
        # 3. Get previous sections
        # --------------------------------------------------

        previous_sections = self.section_repo.list_sections(
            db,
            draft_id,
        )

        draft_context_parts = []

        for item in previous_sections:

            if item.section == section:
                continue

            if not item.content.strip():
                continue

            draft_context_parts.append(
                f"# {item.section.value}\n\n"
                f"{item.content}\n\n"
            )

        draft_context = "".join(
            draft_context_parts
        )

        # --------------------------------------------------
        # 4. Retrieve ONLY selected papers
        # --------------------------------------------------

        if not draft.paper_ids:
            raise ValueError(
                "No papers are associated with this draft."
            )

        retrieval = (
            self.retrieval
            .retrieve_multiple_papers_with_references(
                paper_ids=draft.paper_ids,
                query=f"{topic} {section.value}",
                chunks_per_paper=3,
            )
        )

        context = retrieval["context"]
        references = retrieval["references"]

        if not context:
            raise ValueError(
                "No relevant content found in the selected papers."
            )

        # --------------------------------------------------
        # 5. Generate section
        # --------------------------------------------------

        generated = self.agent.generate(
            context=context,
            references=references,
            draft_context=draft_context,
            topic=topic,
            section=section.value,
            instructions=final_instructions,
        )

        # --------------------------------------------------
        # 6. Save generated section
        # --------------------------------------------------

        saved = self.section_repo.save_section(
            db=db,
            draft_id=draft_id,
            section=section,
            content=generated,
            display_order=SECTION_ORDER[section],
        )

        return saved