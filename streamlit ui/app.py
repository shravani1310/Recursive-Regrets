import streamlit as st
import requests
import pandas as pd
import io

# Define the API endpoint
API_URL = "https://api-test-237n.onrender.com"# Update this if your API is hosted elsewhere

# Streamlit app
def main():
    st.title("API Feature Interface")

    # Sidebar for navigation
    st.sidebar.title("Navigation")
    choice = st.sidebar.radio("Choose a feature", ["Generate Visualization", "Analyze Code", "Generate Case Study"])

    if choice == "Generate Visualization":
        st.header("Generate Visualization")
        st.write("Upload a dataset, specify features, and choose a visualization type to generate a plot.")

        # File upload
        dataset_file = st.file_uploader("Upload a CSV file", type=["csv"])
        if dataset_file:
            st.write("Dataset Preview:")
            dataset = pd.read_csv(dataset_file)
            st.write(dataset.head())

        # Input for features and visualization type
        features = st.text_input("Enter features (comma-separated)")
        visualization_type = st.selectbox("Choose visualization type", ["bar", "line", "scatter", "histogram"])

        if st.button("Generate Visualization"):
            if dataset_file and features and visualization_type:
                files = {"dataset_file": dataset_file.getvalue()}
                data = {
                    "features": features,
                    "visualization_type": visualization_type
                }
                response = requests.post(f"{API_URL}/generate-visualization/", files=files, data=data)
                if response.status_code == 200:
                    st.image(io.BytesIO(response.content), caption="Generated Visualization")
                else:
                    st.error(f"Error: {response.status_code} - {response.text}")
            else:
                st.error("Please upload a dataset and provide features and visualization type.")

    elif choice == "Analyze Code":
        st.header("Analyze Code")
        st.write("Input your code and get the fixed code as output.")

        # Input for code
        input_code = st.text_area("Enter your code here")

        if st.button("Analyze Code"):
            if input_code:
                data = {"input_code": input_code}
                response = requests.post(f"{API_URL}/analyze-code/", data=data)
                if response.status_code == 200:
                    result = response.json()
                    st.write("Fixed Code:")
                    st.code(result["analysis"], language="python")
                else:
                    st.error(f"Error: {response.status_code} - {response.text}")
            else:
                st.error("Please enter some code to analyze.")

    elif choice == "Generate Case Study":
        st.header("Generate Case Study")
        st.write("Upload a CSV file and provide a concept to generate a case study.")

        # File upload
        csv_file = st.file_uploader("Upload a CSV file", type=["csv"])
        if csv_file:
            st.write("Dataset Preview:")
            dataset = pd.read_csv(csv_file)
            st.write(dataset.head())

        # Input for concept
        concept = st.text_input("Enter a concept")

        if st.button("Generate Case Study"):
            if csv_file and concept:
                files = {"csv_file": csv_file.getvalue()}
                data = {"concept": concept}
                response = requests.post(f"{API_URL}/generate-case-study/", files=files, data=data)
                if response.status_code == 200:
                    result = response.json()
                    st.write("Generated Case Study:")
                    st.write(result["result"])
                else:
                    st.error(f"Error: {response.status_code} - {response.text}")
            else:
                st.error("Please upload a CSV file and provide a concept.")

if __name__ == "__main__":
    main()