from app.models.draft_section import DraftSectionType

SECTION_ORDER = {
    DraftSectionType.ABSTRACT: 1,
    DraftSectionType.INTRODUCTION: 2,
    DraftSectionType.RELATED_WORK: 3,
    DraftSectionType.METHODOLOGY: 4,
    DraftSectionType.EXPERIMENTS: 5,
    DraftSectionType.RESULTS: 6,
    DraftSectionType.DISCUSSION: 7,
    DraftSectionType.CONCLUSION: 8,
}