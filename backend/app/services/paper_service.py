from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.paper import Paper, PaperStatus
from app.repositories.paper_repository import PaperRepository
from app.services.chunking_service import ChunkingService
from app.services.embedding_service import EmbeddingService
from app.services.pdf_service import PDFService
from app.services.qdrant_service import QdrantService
from app.storage.minio import MinIOStorage


class PaperService:
    def __init__(self):
        self.repo = PaperRepository()
        self.storage = MinIOStorage()
        self.pdf_service = PDFService()

        self.chunking_service = ChunkingService()
        self.embedding_service = EmbeddingService()
        self.qdrant_service = QdrantService()

    async def upload(
        self,
        db: Session,
        project_id: str,
        file: UploadFile,
    ) -> Paper:

        if file.content_type != "application/pdf":
            raise ValueError("Only PDF files are supported.")

        # Read uploaded file
        content = await file.read()

        # Extract metadata and full text
        metadata = self.pdf_service.extract(content)

        # Upload PDF to MinIO
        object_name = self.storage.upload_pdf(
            file.filename,
            content,
        )

        # Create paper object
        paper = Paper(
            project_id=project_id,
            filename=object_name,
            original_filename=file.filename,
            storage_path=object_name,

            title=metadata.get("title"),

            authors=(
                [author.strip() for author in metadata["authors"].split(",")]
                if metadata.get("authors")
                else None
            ),

            page_count=metadata.get("page_count", 0),

            full_text=metadata.get("text"),

            status=PaperStatus.READY,
        )

        # Save paper in PostgreSQL
        paper = self.repo.create(db, paper)

        # -----------------------------
        # Chunk -> Embed -> Store Qdrant
        # -----------------------------
        try:
            chunks = self.chunking_service.chunk(
                paper.full_text or ""
            )

            embeddings = self.embedding_service.embed_many(chunks)

            for index, (chunk, embedding) in enumerate(
                zip(chunks, embeddings)
            ):
                self.qdrant_service.insert(
                    embedding=embedding,
                    payload={
                        "paper_id": paper.id,
                        "project_id": project_id,
                        "chunk": chunk,
                        "chunk_index": index,
                        "title": paper.title,
                        "authors": paper.authors,
                    }
                )

        except Exception as e:
            print(f"Qdrant ingestion failed: {e}")

        return paper

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
        
    def download(
        self,
        db: Session,
        paper_id: str,
    ):
        paper = self.repo.get(
            db,
            paper_id,
        )

        if paper is None:
            raise ValueError(
                "Paper not found."
            )

        return self.storage.download_pdf(
            paper.storage_path,
            paper.original_filename,
        )