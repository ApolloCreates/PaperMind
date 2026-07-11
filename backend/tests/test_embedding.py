# from app.services.embedding_service import EmbeddingService


# service = EmbeddingService()

# vector = service.embed(
#     "Transformers are neural networks."
# )

# print(len(vector))


from app.services.embedding_service import EmbeddingService
import numpy as np

service = EmbeddingService()

v1 = service.embed(
    "Transformers are neural networks."
)

v2 = service.embed(
    "Attention is used in transformers."
)

v3 = service.embed(
    "I love pizza."
)

print(
    np.dot(v1, v2)
)

print(
    np.dot(v1, v3)
)