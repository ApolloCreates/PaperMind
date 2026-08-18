from pydantic import BaseModel

class TopicGenerationRequest(BaseModel):
    project_id: str
    paper_ids: list[str]
    research_area: str


class TopicGenerationResponse(BaseModel):

    topics: str