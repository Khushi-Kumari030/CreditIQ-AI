import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

url = (
    f"https://generativelanguage.googleapis.com/v1beta/models"
    f"?key={api_key}"
)

response = requests.get(url)

print(response.status_code)
print(response.json())