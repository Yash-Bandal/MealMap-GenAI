from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import recommendations


app = FastAPI(
    title="MealMap AI API",
    description="AI-powered diet and fitness recommendation API",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(recommendations.router)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to MealMap AI API"
    }


@app.get("/health", tags=["Health"])
def health():
    return "OK"
