from fastapi import APIRouter, HTTPException

from app.schemas.recommendation import (
    RecommendationRequest,
    RecommendationResponse,
)
from app.services.recommendation_service import generate_recommendations


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.post("", response_model=RecommendationResponse)
def create_recommendations(data: RecommendationRequest):
    try:
        recommendations = generate_recommendations(data)

        return {
            "recommendations": recommendations
        }

    except Exception as e:
        print(f"Recommendation generation failed: {e}")

        raise HTTPException(
            status_code=500,
            detail="Failed to generate recommendations"
        )


@router.get("/health")
def health():
    return {"status": "OK"}
