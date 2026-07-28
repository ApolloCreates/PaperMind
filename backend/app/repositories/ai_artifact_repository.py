from sqlalchemy import func

from sqlalchemy.orm import Session

from app.models.ai_artifact import AIArtifact

from app.core.artifact_types import ArtifactType


class AIArtifactRepository:

    def create(
        self,
        db: Session,
        artifact: AIArtifact,
    ):

        db.add(artifact)

        db.commit()

        db.refresh(artifact)

        return artifact

    def latest_version(
        self,
        db: Session,
        project_id: str,
        artifact_type: ArtifactType,
    ) -> int:

        latest = (
            db.query(
                func.max(
                    AIArtifact.version
                )
            )
            .filter(
                AIArtifact.project_id == project_id,
                AIArtifact.artifact_type == artifact_type,
            )
            .scalar()
        )

        return latest or 0

    def latest(
        self,
        db: Session,
        project_id: str,
        artifact_type: ArtifactType,
    ):

        return (
            db.query(AIArtifact)
            .filter(
                AIArtifact.project_id == project_id,
                AIArtifact.artifact_type == artifact_type,
            )
            .order_by(
                AIArtifact.version.desc()
            )
            .first()
        )

    def history(
        self,
        db: Session,
        project_id: str,
        artifact_type: ArtifactType,
    ):

        return (
            db.query(AIArtifact)
            .filter(
                AIArtifact.project_id == project_id,
                AIArtifact.artifact_type == artifact_type,
            )
            .order_by(
                AIArtifact.version.desc()
            )
            .all()
        )