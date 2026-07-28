from app.models.draft_section import DraftSectionType

SECTION_HEADINGS = {
    DraftSectionType.ABSTRACT: "Abstract",
    DraftSectionType.INTRODUCTION: "Introduction",
    DraftSectionType.RELATED_WORK: "Related Work",
    DraftSectionType.METHODOLOGY: "Methodology",
    DraftSectionType.EXPERIMENTS: "Experiments",
    DraftSectionType.RESULTS: "Results",
    DraftSectionType.DISCUSSION: "Discussion",
    DraftSectionType.CONCLUSION: "Conclusion",
}


def build_full_paper(
    title: str,
    topic: str,
    sections,
) -> str:
    parts = [
        f"# {title}",
        "",
        f"**Topic:** {topic}",
        "",
    ]

    ordered = sorted(
        sections,
        key=lambda s: s.display_order,
    )

    for section in ordered:
        heading = SECTION_HEADINGS[section.section]

        parts.append(f"## {heading}")
        parts.append("")
        parts.append(section.content or "")
        parts.append("")

    return "\n".join(parts)