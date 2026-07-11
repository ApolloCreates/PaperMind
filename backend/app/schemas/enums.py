from enum import Enum


class PaperSection(str, Enum):
    ABSTRACT = "Abstract"
    INTRODUCTION = "Introduction"
    RELATED_WORK = "Related Work"
    METHODOLOGY = "Methodology"
    EXPERIMENTS = "Experiments"
    RESULTS = "Results"
    DISCUSSION = "Discussion"
    CONCLUSION = "Conclusion"