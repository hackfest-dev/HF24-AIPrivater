import requests
import time
# URL of the FastAPI endpoint
url = "http://localhost:8000/translate/"

# Sample Hindi article to be translated
lan=int(input("Enter Language code[1=en,2=hi..]: "))
query=input("Enter your query:")
question = {
    "article_hi": query,
    "language": lan,
}
print(question["article_hi"])
# Sending POST request to the endpoint
start=time.time()
response = requests.post(url, json=question)

# Check if the request was successful
if response.status_code == 200:
    # Print the translated text
    end=time.time()
    t_time=end-start
    print(f'Total time to generate response:{t_time}')
    print("Bot:", response.json()["bot_answer"])
else:
    print("Error:", response.status_code)