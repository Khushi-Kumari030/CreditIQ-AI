import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")


def ask_copilot(
    question,
    borrower,
    prediction,
    explanation,
    strategy,
):
    drivers = ""

    for driver in explanation.get("drivers", []):
        drivers += (
            f"- {driver['feature']}: "
            f"{driver['shap']}\n"
        )

    prompt = f"""
You are CreditIQ Decision Copilot.

You assist loan officers in understanding
credit decisions.

ONLY answer questions related to:
- credit risk
- borrower profiles
- SHAP explanations
- lending strategies
- decision communication

If the question is unrelated,
politely redirect the user.

Borrower Profile:
{borrower}

Prediction:
{prediction}

Decision Strategy:
{strategy}

SHAP Drivers:
{drivers}

Question:
{question}

Answer professionally and concisely.
"""

    url = (
        "https://generativelanguage.googleapis.com/v1beta/"
        f"models/gemini-flash-latest:generateContent"
        f"?key={API_KEY}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(
        url,
        json=payload,
    )

    data = response.json()

    # Keep logs for debugging
    print("Gemini Status:", response.status_code)

    if "candidates" not in data:
        print("Gemini Error:", data)

        return (
            "I'm temporarily unable to generate an AI explanation "
            "at the moment. Please try again in a few seconds."
        )

    text = data["candidates"][0]["content"]["parts"][0]["text"]

    return text.strip()