from litellm import completion

from app.core.config import settings


class ChatAgent:

    MODEL = "groq/llama-3.1-8b-instant"

    def ask(
        self,
        context: str,
        question: str,
    ) -> str:

        response = completion(
            model=self.MODEL,
            api_key=settings.groq_api_key,
            temperature=0.2,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a research assistant. "
                        "Answer ONLY using the provided research paper. "
                        "If the answer is not present, clearly say so."
                    ),
                },
                {
                    "role": "user",
                    "content": f"""
Research Paper

{context[:12000]}

Question

{question}
""",
                },
            ],
        )

        return response.choices[0].message.content