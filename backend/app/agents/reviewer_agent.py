from app.llm.llm_service import LLMService
from app.prompts.reviewer import SYSTEM_PROMPT


class ReviewerAgent:

    def __init__(self):
        self.llm = LLMService()

    def review(
        self,
        text: str,
    ) -> str:

        prompt = f"""
Research Paper

{text[:12000]}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=prompt,
            temperature=0.2,
        )