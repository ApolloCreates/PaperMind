from app.llm.llm_service import LLMService
from app.prompts.summary import SYSTEM_PROMPT


class SummaryAgent:

    def __init__(self):
        self.llm = LLMService()

    def summarize(
        self,
        text: str,
    ) -> str:

        user_prompt = f"""
Research Paper

{text[:12000]}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.2,
        )