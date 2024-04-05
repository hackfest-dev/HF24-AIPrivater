from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import MBartForConditionalGeneration, MBart50Tokenizer
import ollama

app = FastAPI()

class Article(BaseModel):
    article_hi: str
    language:int

model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")

try:
    tokenizer = MBart50Tokenizer.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
except OSError:
    print("Downloading tokenizer...")
    tokenizer = MBart50Tokenizer.from_pretrained("facebook/mbart-large-50-many-to-many-mmt", download=True)

@app.post("/translate/")
async def translate(article: Article):
    if int(article.language) != 1:
        if article.language==2:
            src="hi_IN"
        else:
            src="kn_IN"
        
        article_hi = article.article_hi
        # convert into base language(en)
        tokenizer.src_lang = src
        encoded_hi = tokenizer(article_hi, return_tensors="pt")
        generated_tokens = model.generate(
            **encoded_hi,
            forced_bos_token_id=tokenizer.lang_code_to_id["en_XX"]
        )
        translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        print(translated_text)
        translated_text_str = " ".join(translated_text)
        # pass query to LLM
        answer=ollama.chat(model="mistral",
                        stream=False,
                        messages=[{'role': 'user', 'content': translated_text_str}])
        llm_output=answer["message"]["content"]
        
        # again convert into source language
        tokenizer.src_lang="en_XX"
        encoded_return=tokenizer(llm_output,return_tensors="pt")
        generated_tokens_r=model.generate(
            **encoded_return,
            forced_bos_token_id=tokenizer.lang_code_to_id[src]
        )
        translated_llm_text=tokenizer.batch_decode(generated_tokens_r,skip_special_tokens=True)
        return {"bot_answer":translated_llm_text}
    else:
        article_hi=article.article_hi
        answer=ollama.chat(model="mistral",
                        stream=False,
                        messages=[{'role': 'user', 'content': article_hi}])
        llm_output=answer["message"]["content"]
        return {"bot_answer":llm_output}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

