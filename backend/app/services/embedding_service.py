from functools import lru_cache

from sentence_transformers import SentenceTransformer


@lru_cache
def get_model():
    return SentenceTransformer(
        "BAAI/bge-small-en-v1.5"
    )


class EmbeddingService:

    def __init__(self):
        self.model = get_model()

    def embed(
        self,
        text: str,
    ) -> list[float]:

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
            convert_to_numpy=True,
        )

        return embedding.tolist()

    def embed_many(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
            convert_to_numpy=True,
        )

        return embeddings.tolist()