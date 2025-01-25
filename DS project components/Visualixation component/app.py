import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import re

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(r"C:\Users\lamaq\OneDrive\Desktop\DS project components\.env")
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ['GROQ_API_KEY'] = groq_api_key

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
4. Return only the Python code block that can be executed directly without any additional modifications.
5. Do not include any additional text, comments, or triple backticks in your response.
"""

prompt = PromptTemplate(input_variables=["features", "dataset_summary", "visualization_type"], template=prompt_template)
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

# Streamlit app
st.title("Data Visualization App using LangChain")

# File upload for dataset
uploaded_file = st.file_uploader("Upload a cleaned dataset (CSV format)", type="csv")
visualization_type = st.selectbox(
    "Select the type of visualization",
    ["Line Charts", "Bar Charts", "Pie Charts", "Histograms", "Scatter Plots", "Heat Maps"]
)
features = st.text_input(label="Features Input", placeholder="Enter the features you want to visualize (comma-separated)")

if uploaded_file:
    # Load the dataset
    dataset = pd.read_csv(uploaded_file)
    st.write("### Dataset Preview")
    st.dataframe(dataset)

    # Generate visualization
    if st.button("Generate Visualization"):
        # Create dataset summary
        dataset_summary = dataset.describe(include="all").to_string()

        # Pass inputs to the LLM via LangChain
        response = chain.invoke({"features": features, "dataset_summary": dataset_summary, "visualization_type": visualization_type})
        st.code(response, language="python")  # Display the generated code

        # Execute the generated code
        try:

            cleaned_code = re.sub(r'^```python|```$', '', response, flags=re.MULTILINE)
            exec(cleaned_code)
            st.pyplot(plt)  # Render the visualization
            plt.clf()  # Clear the plot to avoid overlap
        except SyntaxError as se:
            st.error(f"A syntax error occurred: {se}")
        except Exception as e:
            st.error(f"An error occurred while generating the visualization: {e}")
