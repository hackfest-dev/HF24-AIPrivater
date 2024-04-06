import pathlib
import textwrap
import PIL.Image
from IPython.display import display
import google.generativeai as genai
import ollama
from PIL import Image
from IPython.display import Markdown
import os
import PyPDF2,fitz
import shutil

class document_chatting():
    '''
    Attributes:
        Gapi: str   Goggle Api
        model:str    name
        img:str     Image/File Path
    '''
    def __init__(self,doc_path:str) :
        self.Gapi='AIzaSyAo0-zQWQ-Y3XQSTij2bVwIpdC2TeXunCY'
        genai.configure(api_key=self.Gapi)
        self.model=genai.GenerativeModel('gemini-pro-vision')
        self.doc_path=doc_path
        self.outputPath="parsedPDFIMG.txt"
        # self.img = PIL.Image.open(self.img_path)



    # def to_markdown(self,text):
    #     text = text.replace('•', '  *')
    #     txt_content=Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
    #     return markdown2.markdown(txt_content)
    
    # def write_to_file(content, file_path):
    #     file_path="image_text.txt"
    #     with open(file_path, 'w') as file:
    #         file.write(content)

    def type_checker(self):
        # Get the file extension
        _, file_extension = os.path.splitext(self.doc_path)
        # Check if the file extension corresponds to PDF or image
        if file_extension.lower() == '.pdf':
            return self.pdf_reader()  # PDF file
        elif file_extension.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.bmp']:
            return self.img_reader()  # Image file
        else:
            print("File Type not supported!")  # Unknown file type
    
    # def pdf_reader(self):
    #     # Open the PDF file
    #     pdf_document = fitz.open(self.doc_path)
    #     text=[]
    #     for page_num in range(len(pdf_document)):
    #         # Get the page
    #         page = pdf_document.load_page(page_num)
    #         # Convert the page to an image
    #         pix = page.get_pixmap()
    #         pix.pil_save("output/{page_num}.png")
    #         # img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    #         img=Image.open("output/{page_num}.png")
    #         response = self.model.generate_content(["Extract all the text from the image and display it ", img], stream=True)
    #         text.append(response.resolve())
    #     dire_delete="output"
    #     shutil.rmtree(dire_delete)
    #     with open(self.outputPath, 'w') as file:
            
    #         file.write(text + '\n')
    def pdf_reader(self):
        # Open the PDF file
        pdf_document = fitz.open(self.doc_path)
        text = []
        # Create the output directory if it doesn't exist
        output_directory = "output"
        os.makedirs(output_directory, exist_ok=True)
        
        for page_num in range(len(pdf_document)):
            # Get the page
            page = pdf_document.load_page(page_num)
            # Convert the page to an image
            pix = page.get_pixmap()
            image_path = f"output/{page_num}.png"
            pix.pil_save(image_path)
            # # Open the image
            # img = Image.open(image_path)
            # # Generate content from the image
            # response = self.model.generate_content(["Extract all the text from the image and display it ", img], stream=True)
            # text.append(response.resolve())
            # # Delete the image file
        for path_suffix in range(len(pdf_document)):
                image_path=f'output/{path_suffix}.png'
                img=PIL.Image.open(image_path)
                # Generate content from the image
                response = self.model.generate_content(["Extract all the text from the image and display it ", img], stream=True)
                text.append(response.resolve())
        os.remove(image_path)
        
        # Delete the output directory
        shutil.rmtree(output_directory)
        
        # Write the extracted text to the output file
        with open(self.outputPath, 'w') as file:
            file.write('\n'.join(text))



    def img_reader(self):
        img=PIL.Image.open(self.doc_path)
        response = self.model.generate_content(["Extract all the text from the image and display it ", img], stream=True)
        response.resolve()
        with open(self.outputPath, 'w') as file:
            
            file.write(response.text + '\n')
        return response.text    

    def insight_generation(self):
        context=self.type_checker()
        question='Generate medical insights for the following report.'
        formatted_prompt = f"Question: {question}\n\nContext: {context}"
        stream=ollama.chat(
                model='mistral',
                messages=[{'role': 'user', 'content': formatted_prompt}],
                stream=True,
            )
        for chunk in stream:
            print(chunk['message']['content'], end='', flush=True)

parsed=document_chatting(doc_path="hackfest/WM17S.pdf")
display(parsed.insight_generation())