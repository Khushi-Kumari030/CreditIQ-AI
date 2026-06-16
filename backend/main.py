from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import Borrower
from services import predict_risk, explain_prediction
from pydantic import BaseModel
from copilot import ask_copilot

class CopilotRequest(BaseModel):
    question: str
    borrower: dict
    prediction: dict
    explanation: dict
    strategy: str

app = FastAPI(
    title="CreditIQ AI API",
    description="Credit Risk Prediction Backend",
    version="1.0"
)

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "CreditIQ AI Backend Running 🚀"
    }


@app.post("/predict")
def predict(borrower: Borrower):
    result = predict_risk(borrower.dict())

    return result

@app.post("/explain")
def explain(borrower: Borrower):

    result = explain_prediction(
        borrower.dict()
    )

    return result

@app.get("/models")
def get_models():
    return {
        "models": [
            "XGBoost",
            "Baseline",
            "Balanced",
            "SMOTE"
        ],
        "strategies": [
            "Lead",
            "Balanced"
        ]
    }

@app.post("/copilot")
def copilot_chat(
    request: CopilotRequest
):

    response = ask_copilot(
        request.question,
        request.borrower,
        request.prediction,
        request.explanation,
        request.strategy,
    )

    return {
        "response": response
    }