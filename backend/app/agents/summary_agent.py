from litellm import completion

from app.core.config import settings


class SummaryAgent:

    MODEL = "groq/llama-3.3-70b-versatile"

    def summarize(
        self,
        text: str,
    ) -> str:

        response = completion(
            model=self.MODEL,
            api_key=settings.groq_api_key,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert research assistant. "
                        "Generate a concise academic summary."
                    ),
                },
                {
                    "role": "user",
                    "content": text[:12000],
                },
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content