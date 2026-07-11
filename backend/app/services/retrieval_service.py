from app.services.embedding_service import EmbeddingService
from app.services.qdrant_service import QdrantService


class RetrievalService:

    MAX_CONTEXT = 12000

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

        context = ""

        for point in results:

            chunk = point.payload["chunk"]

            if len(context) + len(chunk) > self.MAX_CONTEXT:
                break

            context += chunk + "\n\n"

        return context.strip()

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

        results = sorted(
            results,
            key=lambda p: p.payload.get("chunk_index", 0),
        )

        context = ""

        for point in results:

            chunk = point.payload["chunk"]

            if len(context) + len(chunk) > self.MAX_CONTEXT:
                break

            context += chunk + "\n\n"

        return context.strip()
    
    
    def retrieve_with_references(
        self,
        project_id: str,
        query: str,
        limit: int = 8,
    ):

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search_project(
            embedding=embedding,
            project_id=project_id,
            limit=limit,
        )

        if not results:
            return {
                "context": "",
                "references": [],
            }

        context = ""

        references = {}

        for point in results:

            payload = point.payload

            context += payload["chunk"] + "\n\n"

            paper_id = payload["paper_id"]

            if paper_id not in references:

                references[paper_id] = {
                    "paper_id": paper_id,
                    "title": payload.get("title"),
                    "authors": payload.get("authors"),
                }

        return {
            "context": context.strip(),
            "references": list(references.values()),
        }