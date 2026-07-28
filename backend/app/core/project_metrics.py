def calculate_progress(
    papers: int,
    drafts: int,
    reviews: int,
) -> int:

    progress = 0

    if papers > 0:
        progress += 40

    if drafts > 0:
        progress += 40

    if reviews > 0:
        progress += 20

    return progress


def calculate_status(
    papers: int,
    drafts: int,
    reviews: int,
) -> str:

    if papers == 0:
        return "NEW"

    if drafts == 0:
        return "RESEARCH"

    if reviews == 0:
        return "WRITING"

    return "READY"