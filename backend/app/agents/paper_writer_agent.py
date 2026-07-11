from app.llm.llm_service import LLMService
from app.prompts.paper_writer import SYSTEM_PROMPT

class PaperWriterAgent:

    def __init__(self):
        self.llm = LLMService()

    def generate(
        self,
        context: str,
        topic: str,
        section: str,
        instructions: str | None,
    ):

        user_prompt = f"""
Research Topic

{topic}

Section to Generate

{section}

Additional Instructions

{instructions or "None"}

Research Context

{context}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.3,
        )