from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.paper import Paper
from app.repositories.paper_repository import PaperRepository
from app.storage.minio import MinIOStorage


class UploadPaperUseCase:

    def __init__(self):

        self.repo = PaperRepository()

        self.storage = MinIOStorage()

    async def execute(

        self,

        db: Session,

        project_id: str,

        file: UploadFile,

    ) -> Paper:

        if file.content_type != "application/pdf":

            raise ValueError(
                "Only PDF files are supported."
            )

        pdf = await file.read()

        object_path = self.storage.upload_pdf(

            file.filename,

            pdf,

        )

        paper = Paper(

            project_id=project_id,

            filename=object_path,

            original_filename=file.filename,

            storage_path=object_path,

        )

        return self.repo.create(

            db,

            paper,

        )