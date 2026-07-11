from fastapi import APIRouter

from app.api.v1.endpoints.projects import router as project_router

from app.api.v1.endpoints.papers import router as paper_router

from app.api.v1.endpoints.summary import router as summary_router

from app.api.v1.endpoints.gap import router as gap_router

from app.api.v1.endpoints.chat import router as chat_router

from app.api.v1.endpoints.literature_review import (
    router as literature_review_router,
)

from app.api.v1.endpoints.topic_generation import (
    router as topic_generation_router,
)

from app.api.v1.endpoints.paper_writer import (
    router as paper_writer_router,
)

from app.api.v1.endpoints.reviewer import (
    router as reviewer_router,
)

from app.api.v1.endpoints.drafts import (
    router as draft_router,
)

from app.api.v1.endpoints.export import (
    router as export_router,
)

api_router = APIRouter()

api_router.include_router(project_router)

api_router.include_router(paper_router)

api_router.include_router(summary_router)

api_router.include_router(gap_router)

api_router.include_router(chat_router)

api_router.include_router(literature_review_router)

api_router.include_router(
    topic_generation_router,
)

api_router.include_router(
    paper_writer_router,
)

api_router.include_router(
    reviewer_router,
)

api_router.include_router(
    draft_router,
)

api_router.include_router(
    export_router,
)