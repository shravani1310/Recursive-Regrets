import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import axios from "axios";

const PythonIDE = () => {
    const [code, setCode] = useState("# Write your Python code here\nimport numpy as np\nprint(np.array([1, 2, 3]))");
    const [output, setOutput] = useState("");
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const runCode = async () => {
        const formData = new FormData();
        formData.append("code", code);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/execute/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setOutput(response.data.output);
            setImage(response.data.image);
        } catch (error) {
            setOutput("Error executing code.");
        }
    };

    return (
        <div style={{ padding: "10px", fontFamily: "Arial" }}>
            <h2>Python IDE</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <AceEditor
                mode="python"
                theme="monokai"
                value={code}
                onChange={setCode}
                fontSize={16}
                width="100%"
                height="300px"
                setOptions={{ useWorker: false }}
            />
            <button onClick={runCode} style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white" }}>
                Run Code
            </button>
            <h3>Output:</h3>
            <pre>{output}</pre>
            {image && <img src={`data:image/png;base64,${image}`} alt="Plot" />}
        </div>
    );
};

export default PythonIDE;
