from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from langchain_community.llms import CTransformers
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain import PromptTemplate, LLMChain
import os
import json
import uvicorn

app = FastAPI()

local_llm = "meditron-7b-chat.Q4_K_M.gguf"  # Replace with your local model path

config = {
    'max_new_tokens': 1024,
    'context_length': 2048,
    'repetition_penalty': 1.1,
    'temperature': 0.1,
    'top_k': 50,
    'top_p': 0.9,
    'stream': True,
    'threads': int(os.cpu_count() / 2)
}

llm = CTransformers(
    model=local_llm,
    model_type="llama",  # Adjust if your model type is different
    lib="avx2",
    **config
)

print("LLM Initialized....")

embeddings = HuggingFaceEmbeddings(model_name="NeuML/pubmedbert-base-embeddings")  # Adjust for your embedding model

template = """You're a helpful medical assistant for everyone and give exact responses and help people out with their medical issues
{query}
"""

prompt = PromptTemplate(template=template, input_variables=['query'])

conv_chain = LLMChain(llm=llm,
                       prompt=prompt,
                       verbose=True)
print()


@app.post("/chat")
async def chat(query: str = Form(...)):
    """API endpoint for the chatbot"""
    response = conv_chain.run(query)
    print("Bot reply:", response)
    return JSONResponse({"response": response})


if __name__ == "__main__":
    uvicorn.run("workingAPI:app", host="localhost", port=8000)  # Change port if needed
