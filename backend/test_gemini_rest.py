import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

url = (
    "https://generativelanguage.googleapis.com/v1beta/"
    f"models/gemini-2.5-flash:generateContent"
    f"?key={api_key}"
)
payload = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Say hello in one sentence."
                }
            ]
        }
    ]
}

response = requests.post(url, json=payload)

print(response.status_code)
print(response.json())