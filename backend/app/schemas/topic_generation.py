from pydantic import BaseModel


class TopicGenerationRequest(BaseModel):

    project_id: str

    research_area: str


class TopicGenerationResponse(BaseModel):

    topics: str