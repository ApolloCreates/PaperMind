from qdrant_client import QdrantClient
from qdrant_client.models import Distance
from qdrant_client.models import VectorParams

from app.core.config import settings


class QdrantService:

    COLLECTION = "papers"

    def __init__(self):

        self.client = QdrantClient(
            host=settings.qdrant_host,
            port=settings.qdrant_port,
        )

        self.create_collection()

    def create_collection(self):

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