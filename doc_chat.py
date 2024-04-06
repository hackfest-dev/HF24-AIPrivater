import pathlib
import textwrap
import PIL.Image
from IPython.display import display
import google.generativeai as genai
import ollama
from IPython.display import display
from IPython.display import Markdown
import markdown2
class document_chatting():
    '''
    Attributes:
        Gapi: str   Goggle Api
        model:str    name
        img:str     Image/File Path
    '''
    def __init__(self,img_path:str) :
        self.Gapi='AIzaSyAo0-zQWQ-Y3XQSTij2bVwIpdC2TeXunCY'
        genai.configure(api_key=self.Gapi)
        self.model=genai.GenerativeModel('gemini-pro-vision')
        self.img_path=img_path
        self.img = PIL.Image.open(self.img_path)



    # def to_markdown(self,text):
    #     text = text.replace('•', '  *')
    #     txt_content=Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
    #     return markdown2.markdown(txt_content)
    
    # def write_to_file(content, file_path):
    #     file_path="image_text.txt"
    #     with open(file_path, 'w') as file:
    #         file.write(content)

    def img_pdf_reader(self):
        response = self.model.generate_content(["Extract all the text from the image and display it ", self.img], stream=True)
        response.resolve()
        return response.text

    def insight_generation(self):
        context=self.img_pdf_reader()
        question='Generate medical insights for the following report.'
        formatted_prompt = f"Question: {question}\n\nContext: {context}"
        stream=ollama.chat(
                model='mistral',
                messages=[{'role': 'user', 'content': formatted_prompt}],
                stream=True,
            )
        for chunk in stream:
            print(chunk['message']['content'], end='', flush=True)

parsed=document_chatting(img_path="/Users/venkateshsanwal/Desktop/new_test/Doctor-Prescripton-Handwritten-Recoginition/demo/report.jpg")
display(parsed.insight_generation())