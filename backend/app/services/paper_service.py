from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.paper import Paper
from app.repositories.paper_repository import PaperRepository
from app.storage.minio import MinIOStorage
from app.services.pdf_service import PDFService


class PaperService:
    def __init__(self):
        self.repo = PaperRepository()
        self.storage = MinIOStorage()
        self.pdf_service = PDFService()

    async def upload(
        self,
        db: Session,
        project_id: str,
        file: UploadFile,
    ) -> Paper:

        if file.content_type != "application/pdf":
            raise ValueError("Only PDF files are supported.")

        content = await file.read()

        metadata = self.pdf_service.extract(content)

        object_name = self.storage.upload_pdf(
        file.filename,
        content,
        )

        paper = Paper(
            project_id=project_id,
            filename=object_name,
            original_filename=file.filename,
            storage_path=object_name,

            title=metadata["title"],
            page_count=metadata["page_count"],
        )

        return self.repo.create(db, paper)

    def list_all(
        self,
        db: Session,
    ):
        return self.repo.list_all(db)

    def list_project_papers(
        self,
        db: Session,
        project_id: str,
    ):
        return self.repo.list_by_project(
            db,
            project_id,
        )

    def get_paper(
        self,
        db: Session,
        paper_id: str,
    ):
        return self.repo.get(
            db,
            paper_id,
        )

    def delete(
        self,
        db: Session,
        paper: Paper,
    ):
        self.repo.delete(
            db,
            paper,
        )