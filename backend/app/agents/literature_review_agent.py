from app.llm.llm_service import LLMService
from app.prompts.literature_review import SYSTEM_PROMPT


class LiteratureReviewAgent:

    def __init__(self):
        self.llm = LLMService()

    def generate(
        self,
        context: str,
        topic: str,
    ) -> str:

        user_prompt = f"""
Research Topic

{topic}

Research Context

{context}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.3,
        )