from uuid import uuid4

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
    Filter,
    FieldCondition,
    MatchValue
)

from app.core.config import settings


class QdrantService:

    COLLECTION = "papers"

    def __init__(self):

        self.client = QdrantClient(
            host=settings.qdrant_host,
            port=settings.qdrant_port,
        )

        self._create_collection()

    def _create_collection(self):

        collections = self.client.get_collections()

        names = [
            c.name
            for c in collections.collections
        ]

        if self.COLLECTION in names:
            return

        self.client.create_collection(
            collection_name=self.COLLECTION,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE,
            ),
        )

    def insert(
        self,
        embedding: list[float],
        payload: dict,
    ):

        self.client.upsert(
            collection_name=self.COLLECTION,
            wait=True,
            points=[
                PointStruct(
                    id=str(uuid4()),
                    vector=embedding,
                    payload=payload,
                )
            ],
        )


    def search(
        self,
        embedding: list[float],
        paper_id: str,
        limit: int = 8,
    ):

        results = self.client.query_points(
            collection_name=self.COLLECTION,
            query=embedding,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="paper_id",
                        match=MatchValue(value=paper_id),
                    )
                ]
            ),
            limit=limit,
        )

        return results.points
    
    
    def search_project(
        self,
        embedding: list[float],
        project_id: str,
        limit: int = 20,
    ):

        results = self.client.query_points(
            collection_name=self.COLLECTION,
            query=embedding,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="project_id",
                        match=MatchValue(
                            value=project_id,
                        ),
                    )
                ]
            ),
            limit=limit,
        )

        return results.points
    
    def search_multiple_papers(
        self,
        embedding: list[float],
        paper_ids: list[str],
        limit_per_paper: int = 2,
    ):

        all_results = []

        for paper_id in paper_ids:
            results = self.client.query_points(
                collection_name=self.COLLECTION,
                query=embedding,
                query_filter=Filter(
                    must=[
                        FieldCondition(
                            key="paper_id",
                            match=MatchValue(value=paper_id),
                        )
                    ]
                ),
                limit=limit_per_paper,
            )

            all_results.extend(results.points)

        return all_results