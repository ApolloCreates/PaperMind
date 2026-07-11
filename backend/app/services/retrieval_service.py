from app.services.embedding_service import EmbeddingService
from app.services.qdrant_service import QdrantService


class RetrievalService:

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.qdrant_service = QdrantService()

    def retrieve_for_paper(
        self,
        paper_id: str,
        query: str,
        limit: int = 8,
    ) -> str:

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search(
            embedding=embedding,
            paper_id=paper_id,
            limit=limit,
        )

        if not results:
            return ""

        results = sorted(
            results,
            key=lambda p: p.payload.get("chunk_index", 0),
        )

        return "\n\n".join(
            point.payload["chunk"]
            for point in results
        )

    def retrieve_for_project(
        self,
        project_id: str,
        query: str,
        limit: int = 8,
    ) -> str:

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search_project(
            embedding=embedding,
            project_id=project_id,
            limit=limit,
        )

        if not results:
            return ""

        MAX_CONTEXT = 12000

        context = ""

        for point in results:

            chunk = point.payload["chunk"]

            if len(context) + len(chunk) > MAX_CONTEXT:
                break

            context += chunk + "\n\n"

        return [
            point.payload["chunk"]
            for point in results
        ]