from litellm import query

from app.services.embedding_service import EmbeddingService
from app.services.qdrant_service import QdrantService


class RetrievalService:

    # ~1200-1500 tokens of retrieved context
    MAX_CONTEXT = 5000

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.qdrant_service = QdrantService()

    def _build_context(self, results) -> str:
        """
        Build a clean context from retrieved chunks while preserving
        semantic ranking returned by Qdrant.
        """

        context_parts = []
        current_size = 0

        for point in results:
            payload = point.payload

            title = payload.get("title", "Unknown Paper")
            authors = payload.get("authors", "")
            chunk = payload["chunk"]

            section = (
                f"Paper: {title}\n"
                f"Authors: {authors}\n\n"
                f"{chunk}\n\n"
                "----------------------------------------\n"
            )

            if current_size + len(section) > self.MAX_CONTEXT:
                break

            context_parts.append(section)
            current_size += len(section)

        return "".join(context_parts).strip()

    def retrieve_for_paper(
        self,
        paper_id: str,
        query: str,
        limit: int = 5,
    ) -> str:

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search(
            embedding=embedding,
            paper_id=paper_id,
            limit=limit,
        )

        if not results:
            return ""

        return self._build_context(results)

    def retrieve_for_project(
        self,
        project_id: str,
        query: str,
        limit: int = 5,
    ) -> str:

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search_project(
            embedding=embedding,
            project_id=project_id,
            limit=limit,
        )

        if not results:
            return ""

        return self._build_context(results)

    def retrieve_with_references(
        self,
        project_id: str,
        query: str,
        limit: int = 5,
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

        references = {}

        context = self._build_context(results)

        for point in results:
            payload = point.payload

            paper_id = payload["paper_id"]

            if paper_id not in references:
                references[paper_id] = {
                    "paper_id": paper_id,
                    "title": payload.get("title"),
                    "authors": payload.get("authors"),
                }

        return {
            "context": context,
            "references": list(references.values()),
        }
        
        
    def retrieve_multiple_papers(
        self,
        paper_ids: list[str],
        query: str,
        chunks_per_paper: int = 2,
    ) -> str:

        embedding = self.embedding_service.embed(query)

        results = self.qdrant_service.search_multiple_papers(
            embedding=embedding,
            paper_ids=paper_ids,
            limit_per_paper=chunks_per_paper,
        )

        if not results:
            return ""

        return self._build_context(results)
        
    def retrieve_multiple_papers_with_references(
        self,
        paper_ids: list[str],
        query: str,
        chunks_per_paper: int = 3,
    ):
        context_parts = []
        references = {}

        for paper_id in paper_ids:

            embedding = self.embedding_service.embed(query)

            results = self.qdrant_service.search(
                embedding=embedding,
                paper_id=paper_id,
                limit=chunks_per_paper,
            )

            if not results:
                continue

            paper_context = self._build_context(results)

            if paper_context:
                context_parts.append(paper_context)

            for point in results:

                payload = point.payload

                if paper_id not in references:
                    references[paper_id] = {
                        "paper_id": paper_id,
                        "title": payload.get(
                            "title",
                            "Unknown Paper",
                        ),
                        "authors": payload.get(
                            "authors",
                            "",
                        ),
                    }

        return {
            "context": "\n\n".join(context_parts).strip(),
            "references": list(references.values()),
        }