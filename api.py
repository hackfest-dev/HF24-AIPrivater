from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import MBartForConditionalGeneration, MBart50Tokenizer

app = FastAPI()

class Article(BaseModel):
    article_hi: str

model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
tokenizer = MBart50Tokenizer.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")

@app.post("/translate/")
async def translate(article: Article):
    article_hi = article.article_hi

    tokenizer.src_lang = "hi_IN"
    encoded_hi = tokenizer(article_hi, return_tensors="pt")
    generated_tokens = model.generate(
        **encoded_hi,
        forced_bos_token_id=tokenizer.lang_code_to_id["en_XX"]
    )
    translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)

    return {"translated_text": translated_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
