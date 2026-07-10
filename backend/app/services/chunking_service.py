import re


class ChunkingService:
    def __init__(
        self,
        chunk_size: int = 1200,
        overlap: int = 200,
    ):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def clean_text(self, text: str) -> str:
        text = re.sub(r"\n+", "\n", text)
        text = re.sub(r"[ \t]+", " ", text)
        return text.strip()

    def chunk(self, text: str) -> list[str]:

        text = self.clean_text(text)

        chunks = []

        start = 0

        while start < len(text):

            end = start + self.chunk_size

            chunks.append(text[start:end])

            start += self.chunk_size - self.overlap

        return chunks