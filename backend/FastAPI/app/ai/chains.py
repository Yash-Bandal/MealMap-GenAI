
from langchain_google_genai import ChatGoogleGenerativeAI

from app.ai.prompts import recommendation_prompt
from app.core.config import settings
from app.schemas.recommendation import Recommendations


# Initialize Gemini
llm = ChatGoogleGenerativeAI(
    model=settings.GEMINI_MODEL,
    api_key=settings.GOOGLE_API_KEY,
)


# Configure structured output using Pydantic
structured_llm = llm.with_structured_output(
    Recommendations,
    method="json_schema"
)


# Connect prompt with structured LLM
recommendation_chain = recommendation_prompt | structured_llm
