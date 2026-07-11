from litellm import completion

from app.core.config import settings


class LiteratureReviewAgent:

    MODEL = "groq/llama-3.1-8b-instant"

    def generate(self, context: str) -> str:

        response = completion(
            model=self.MODEL,
            api_key=settings.groq_api_key,
            temperature=0.3,
            messages=[
                {
                    "role": "system",
                    "content": """
You are an experienced research scientist.

Using ONLY the provided papers, write a literature review with the following sections:

# Introduction

# Existing Approaches

# Strengths

# Weaknesses

# Research Trends

# Future Directions

Write in an academic tone.
""",
                },
                {
                    "role": "user",
                    "content": context[:25000],
                },
            ],
        )

        return response.choices[0].message.content