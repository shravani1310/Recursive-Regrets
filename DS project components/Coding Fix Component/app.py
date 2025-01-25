import streamlit as st
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Define the LLM
llm = OllamaLLM(
    model="deepseek-coder-v2",
    temperature=0.7,
    streaming=True  # Enables streaming
)

# Define the prompt template
coder_template = """
    You are a Senior Data Analyst and Machine Learning Engineer. Your job is to analyse any given code and ensure that it doesn't contain any errors.
    If the code is correct you will provide a short and concise report on how it works.
    Do not improve the code if not necessary.
    If the code is incorrect you must fix the code and help the user understand where they went wrong with chain of thought and logical reasoning.
    For explaining any concept use simple and clear language and avoid using jargon.
    When explaining a concept provide a non-technical analogy to help the user understand the concept better.
    
    Here is the code to analyze:
    
    Code : {code}
"""
code_prompt = PromptTemplate(
    template=coder_template,
    input_variables=["code"]
)

# Define the output parser
output_parser = StrOutputParser()

# Streamlit App UI
st.title("Code Analysis with DeepSeek Coder v2")
st.markdown("Paste your code below, and the AI will analyze it for you.")

# Input box for the user code
user_code = st.text_area("Enter your code here:", height=300)

# Button to trigger analysis
if st.button("Analyze Code"):
    if user_code.strip():
        # Display loading spinner
        with st.spinner("Analyzing code..."):
            # Generate the prompt
            prompt = code_prompt.format(code=user_code)

            # Create a placeholder for streaming the output
            placeholder = st.empty()
            content=""

            # Call the LLM and stream the output
            for chunk in llm.stream(prompt):
                content += chunk
                placeholder.text(content)

    else:
        st.error("Please enter some code to analyze.")
