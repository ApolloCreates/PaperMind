from app.services.embedding_service import EmbeddingService
from app.services.qdrant_service import QdrantService

embedder = EmbeddingService()
qdrant = QdrantService()

vector = embedder.embed(
    "Transformers use attention."
)

qdrant.insert(
    embedding=vector,
    payload={
        "paper_id": "test",
        "chunk": "Transformers use attention."
    },
)

print("Stored successfully.")