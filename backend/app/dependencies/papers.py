from app.repositories.paper_repository import PaperRepository
from app.storage.minio import MinIOStorage
from app.usecases.papers.upload_paper import UploadPaperUseCase


def get_upload_paper_usecase():

    return UploadPaperUseCase(
        repository=PaperRepository(),
        storage=MinIOStorage(),
    )