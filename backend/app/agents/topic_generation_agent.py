from app.llm.llm_service import LLMService
from app.prompts.topic_generation import SYSTEM_PROMPT


class TopicGenerationAgent:

    def __init__(self):
        self.llm = LLMService()

    def generate(
        self,
        context: str,
        research_area: str,
    ) -> str:

        user_prompt = f"""
Research Area

{research_area}

Research Context

{context}
"""

        return self.llm.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            temperature=0.4,
        )