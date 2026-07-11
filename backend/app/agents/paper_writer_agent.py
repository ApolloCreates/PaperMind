from app.llm.llm_service import LLMService
from app.prompts.paper_writer import SYSTEM_PROMPT


class PaperWriterAgent:

    def __init__(self):
        self.llm = LLMService()

    def generate(
        self,
        context: str,
        references: list,
        draft_context: str,
        topic: str,
        section: str,
        instructions: str | None,
    ) -> str:
        
        reference_text = ""

        for index, reference in enumerate(
            references,
            start=1,
        ):

            authors = reference.get("authors")

            if isinstance(authors, list):
                authors = ", ".join(authors)

            reference_text += (
                f"[{index}] {reference['title']}\n"
                f"Authors: {authors}\n\n"
            )
            

        user_prompt = f"""
Research Topic

{topic}

Section to Generate

{section}

Additional Instructions

{instructions or "None"}

Existing Draft

{draft_context}

Research Context

{context}

Retrieved References

{reference_text}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.3,
        )