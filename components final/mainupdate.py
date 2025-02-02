from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv(r"F:\DESKTOP\shanu\Hac\Co-code\Backend\.env")
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ['GROQ_API_KEY'] = "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"

# Set up the LangChain LLM
llm = ChatGroq(
    api_key=groq_api_key,
    model="llama-3.3-70b-versatile",
    temperature=0.8,
    max_tokens=1028,
    max_retries=2,
    verbose=True,
)

# Define the prompt template
prompt_template = """
You are an expert Python data visualization developer. Your task is to generate Python code for a clean and functional data visualization based on the following input:

Features: {features}
Dataset summary: {dataset_summary}
Visualization type: {visualization_type}

Requirements:
1. The code must assume the dataset is already loaded into a variable called 'dataset'.
2. Ensure the code uses matplotlib or seaborn.
3. Handle edge cases like missing columns or empty datasets with error checks.
4. Return only the Python code block that can be executed directly without any additional modifications(don't execute the code using plt.show()).
5. Do not include any additional text, comments, or triple backticks in your response.
"""

prompt = PromptTemplate(input_variables=["features", "dataset_summary", "visualization_type"], template=prompt_template)
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/generate-visualization/")
async def generate_visualization(
    features: str = Form(...),
    visualization_type: str = Form(...),
    dataset_file: UploadFile = None
):
    try:
        if not dataset_file:
            raise HTTPException(status_code=400, detail="Dataset file is required.")

        # Load the dataset
        dataset = pd.read_csv(dataset_file.file)
        dataset_summary = dataset.describe(include="all").to_string()

        # Pass inputs to the LLM via LangChain
        response = chain.invoke({
            "features": features,
            "dataset_summary": dataset_summary,
            "visualization_type": visualization_type
        })

        # Clean the response
        cleaned_code = re.sub(r'^```python|```$', '', response, flags=re.MULTILINE)
        print(cleaned_code)

        # Prepare execution context
        exec_globals = {"plt": plt, "sns": sns, "pd": pd}
        exec_locals = {"dataset": dataset}
        exec(cleaned_code, exec_globals, exec_locals)

        # Save the plot to a BytesIO stream
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        plt.close()

        # Return the image as a stream
        return StreamingResponse(buf, media_type="image/png")

    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The uploaded file is empty or not a valid CSV.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
