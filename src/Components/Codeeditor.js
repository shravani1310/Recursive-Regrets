import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

// Define the API configuration
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Define the function to execute code using the Piston API
const executeCode = async (language, sourceCode, stdin) => {
  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin: stdin,
    });
    return response.data;
  } catch (error) {
    console.error('Error executing code:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Define the language versions (update these based on the actual versions supported by the API)
const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  // Add more languages and versions as required
};

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Supported languages by Piston API
  const languages = Object.keys(LANGUAGE_VERSIONS);

  const handleRunCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const result = await executeCode(language, code, input);
      setOutput(result.run.output || "No output");
    } catch (err) {
      setError("Failed to execute the code. Check your syntax or try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ marginBottom: "10px" }}>Code Editor</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={handleRunCode}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Run Code
        </button>
      </div>
      <Editor
        height="400px"
        defaultLanguage={language}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <h3>Input:</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <h3>Output:</h3>
        {error ? (
          <pre
            style={{
              color: "red",
              backgroundColor: "#fee",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #fbb",
            }}
          >
            {error}
          </pre>
        ) : (
          <pre
            style={{
              backgroundColor: "#eee",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;