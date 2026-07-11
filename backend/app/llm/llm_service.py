from litellm import completion

from app.core.config import settings


class LLMService:

    DEFAULT_MODEL = "groq/llama-3.1-8b-instant"

    def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
        model: str | None = None,
    ) -> str:

        response = completion(
            model=model or self.DEFAULT_MODEL,
            api_key=settings.groq_api_key,
            temperature=temperature,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
        )

        return response.choices[0].message.content