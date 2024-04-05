from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# from transformers import MBartForConditionalGeneration, MBart50Tokenizer
import ollama
# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM,pipeline


app = FastAPI()

class Article(BaseModel):
    article_hi: str
    language:int

model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")

try:
    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
except OSError:
    print("Downloading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M", download=True)

@app.post("/translate/")
async def translate(article: Article):
    if int(article.language) != 1:
        if article.language==2:
            target_lang="eng_Latn"
            source_lang="hin_Deva"
        else:
            target_lang="eng_Latn"
            source_lang="kan_Knda"
            
        
        article_hi = article.article_hi
        # convert into base language(en)
        translator = pipeline(task="translation", model=model, tokenizer=tokenizer, src_lang=source_lang, tgt_lang=target_lang, max_length = 100)
        
        output = translator(article_hi)
        translated_text = output[0]['translation_text']
        # translated_text_str = " ".join(translated_text)
        # pass query to LLM
        answer=ollama.chat(model="mistral",
                        stream=False,
                        messages=[{'role': 'user', 'content': translated_text}])
        llm_output=answer["message"]["content"]
        
        # again convert into source language
        translator = pipeline(task="translation", model=model, tokenizer=tokenizer, src_lang=target_lang, tgt_lang=source_lang, max_length = 999)
        
        output = translator(article_hi)
        translated_text = output[0]['translation_text']
        # translated_llm_text = " ".join(translated_text)
        return {"bot_answer":translated_text}
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

