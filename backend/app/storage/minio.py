from minio import Minio

from app.core.config import settings

client = Minio(
    f"{settings.minio_host}:{settings.minio_port}",
    access_key=settings.minio_root_user,
    secret_key=settings.minio_root_password,
    secure=False,
)

BUCKET_NAME = "papers"


def initialize_bucket():

    if not client.bucket_exists(BUCKET_NAME):

        client.make_bucket(BUCKET_NAME)