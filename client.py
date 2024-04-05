import requests

# URL of the FastAPI endpoint
url = "http://localhost:8000/translate/"

# Sample Hindi article to be translated
data = {
    "article_hi": "इस अद्भुत विश्व में, सूर्य अपनी पूरी क्षमता के साथ प्रकाशमय होता है और पृथ्वी पर जीवन का समर्थन करता है, जो इस परिपूर्ण ग्रह की शानदारता को बढ़ाता है।"
}

# Sending POST request to the endpoint
response = requests.post(url, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Print the translated text
    print("Translated Text:", response.json()["translated_text"])
else:
    print("Error:", response.status_code)
