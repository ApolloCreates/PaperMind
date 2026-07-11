from sqlalchemy.orm import Session

from app.models.draft import Draft
from app.repositories.draft_repository import DraftRepository
from app.repositories.draft_section_repository import (
    DraftSectionRepository,
)
from app.core.constants import SECTION_ORDER


class DraftService:

    def __init__(self):
        self.repo = DraftRepository()
        self.section_repo = DraftSectionRepository()

    def create(
        self,
        db: Session,
        project_id: str,
        title: str,
        topic: str,
    ):

        draft = Draft(
            project_id=project_id,
            title=title,
            topic=topic,
        )

        return self.repo.create(
            db,
            draft,
        )

    def list_project_drafts(
        self,
        db: Session,
        project_id: str,
    ):

        return self.repo.list_by_project(
            db,
            project_id,
        )

    def get(
        self,
        db: Session,
        draft_id: str,
    ):

        draft = self.repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError(
                "Draft not found."
            )

        sections = self.section_repo.list_sections(
            db,
            draft_id,
        )

        return {
            "id": draft.id,
            "project_id": draft.project_id,
            "title": draft.title,
            "topic": draft.topic,
            "created_at": draft.created_at,
            "updated_at": draft.updated_at,
            "sections": sections,
        }

    def save_section(
        self,
        db: Session,
        draft_id: str,
        section,
        content: str,
    ):

        draft = self.repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError(
                "Draft not found."
            )

        return self.section_repo.save_section(
            db=db,
            draft_id=draft_id,
            section=section,
            content=content,
            display_order=SECTION_ORDER[section],
        )

    def delete(
        self,
        db: Session,
        draft_id: str,
    ):

        draft = self.repo.get(
            db,
            draft_id,
        )

        if draft is None:
            raise ValueError(
                "Draft not found."
            )

        self.section_repo.delete_by_draft(
            db,
            draft_id,
        )

        self.repo.delete(
            db,
            draft,
        )