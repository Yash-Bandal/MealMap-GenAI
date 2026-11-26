from fastapi import APIRouter

router = APIRouter(
    prefix="/diets",
    tags=["Diets"]
)


@router.get("/")
def get_diets():
    return {
        "message": "Get all diets"
    }