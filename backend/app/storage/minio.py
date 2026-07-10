from io import BytesIO
from uuid import uuid4

from minio import Minio

from app.core.config import settings

BUCKET_NAME = "papers"

client = Minio(
    f"{settings.minio_host}:{settings.minio_port}",
    access_key=settings.minio_root_user,
    secret_key=settings.minio_root_password,
    secure=False,
)


def initialize_bucket():
    if not client.bucket_exists(BUCKET_NAME):
        client.make_bucket(BUCKET_NAME)


class MinIOStorage:

    def upload_pdf(
        self,
        filename: str,
        content: bytes,
    ) -> str:

        object_name = f"{uuid4()}.pdf"

        client.put_object(
            bucket_name=BUCKET_NAME,
            object_name=object_name,
            data=BytesIO(content),
            length=len(content),
            content_type="application/pdf",
        )

        return object_name