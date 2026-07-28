from enum import Enum


class ArtifactType(str, Enum):

    LITERATURE = "literature"

    GAP = "gap"

    TOPICS = "topics"

    REVIEW = "review"

    SUMMARY = "summary"

    DRAFT = "draft"