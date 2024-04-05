import requests
import time
# Replace with your desired query
query = "How can I improve my sleep?"

# Replace with your server's IP if necessary
url = "http://localhost:8000/chat"
start=time.time()
response = requests.post(url, data={"query": query})

# Check for successful response
if response.status_code == 200:
    data = response.json()
    print("Bot response:", data["response"])
    end=time.time()
    print(start-end)
else:
    print("Error:", response.status_code)
