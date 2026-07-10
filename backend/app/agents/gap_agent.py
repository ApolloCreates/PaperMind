from litellm import completion

from app.core.config import settings


class GapAgent:

    MODEL = "groq/llama-3.1-8b-instant"

    def analyze(
        self,
        text: str,
    ) -> str:

        response = completion(
            model=self.MODEL,
            api_key=settings.groq_api_key,
            temperature=0.2,
            messages=[
                {
                    "role": "system",
                    "content": """
You are an expert research scientist.

Analyze the paper and identify:

1. Research gaps
2. Limitations
3. Future work
4. Open problems

Return the answer in markdown.
""",
                },
                {
                    "role": "user",
                    "content": text[:12000],
                },
            ],
        )

        return response.choices[0].message.content