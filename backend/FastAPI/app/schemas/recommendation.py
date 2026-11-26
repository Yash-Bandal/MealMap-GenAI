
from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    dietary_preferences: str = ""
    fitness_goals: str = ""
    lifestyle_factors: str = ""
    dietary_restrictions: str = ""
    health_conditions: str = ""
    user_query: str = ""


class Recommendations(BaseModel):
    diet_types: list[str] = Field(
        min_length=5,
        max_length=5,
        description="Five personalized diet recommendations."
    )

    workouts: list[str] = Field(
        min_length=5,
        max_length=5,
        description="Five suitable workout recommendations."
    )

    breakfasts: list[str] = Field(
        min_length=5,
        max_length=5,
        description="Five practical breakfast suggestions."
    )

    dinners: list[str] = Field(
        min_length=5,
        max_length=5,
        description="Five practical dinner suggestions."
    )

    additional_tips: list[str] = Field(
        min_length=5,
        max_length=5,
        description="Five additional health and lifestyle tips."
    )


class RecommendationResponse(BaseModel):
    recommendations: Recommendations
