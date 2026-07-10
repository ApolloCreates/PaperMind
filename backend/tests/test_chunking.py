from app.services.chunking_service import ChunkingService

service = ChunkingService()

text = "Hello World " * 1000

chunks = service.chunk(text)

print(len(chunks))

print(chunks[0][:100])