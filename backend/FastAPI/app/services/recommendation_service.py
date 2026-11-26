from app.ai.chains import recommendation_chain
from app.schemas.recommendation import (
    RecommendationRequest,
    Recommendations,
)


def generate_recommendations(
    data: RecommendationRequest
) -> Recommendations:

    response = recommendation_chain.invoke(
        data.model_dump()
    )

    # print("\n========== STRUCTURED GEMINI RESPONSE ==========")
    # print("Response type:", type(response))
    # print(response.model_dump_json(indent=2))
    # print("================================================\n")

    return response
