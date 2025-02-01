/*import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to get params from URL
import { Loader } from "lucide-react"; // Assuming you still want to use this loader
import CodeEditor from "../Code editor/CodeEditor"; // Assuming you already have a Code Editor component

export default function CaseStudyPage() {
  const { id } = useParams(); // Fetch the case study by 'id' from URL
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/case-studies/${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Case Study:", data); // Log the response for debugging
  
        if (data && data.title) {
          setCaseStudy(data);
        } else {
          console.error("No case study found in response:", data);
          setCaseStudy(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching case study:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-10" size={32} />;
  }

  if (!caseStudy) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-500">Case study not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold">{caseStudy.title}</h1>
        <p className="text-gray-600">Domain: {caseStudy.domain}</p>
        <p className="text-gray-800 mt-2">{caseStudy.problem_statement}</p>
        <p className="text-gray-500 mt-2">Difficulty: {caseStudy.difficulty}</p>
        <a
          href={caseStudy.dataset_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Download Dataset
        </a>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Milestones</h2>
        {caseStudy.milestones?.length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {caseStudy.milestones.map((milestone, index) => (
              <li key={index} className="text-gray-700">{milestone}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No milestones available.</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Solve the Problem</h2>
        <CodeEditor />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4">
        Mark as Completed
      </button>
    </div>
  );
}
*/

import React, { useState } from "react";
import PythonIDE from "../Code editor/CodeEditor";
import "../CSS/GenerateVisualization.css";

const GenerateVisualization = () => {
  const [features, setFeatures] = useState("");
  const [visualizationType, setVisualizationType] = useState("");
  const [datasetFile, setDatasetFile] = useState(null);
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setDatasetFile(event.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!features || !visualizationType || !datasetFile) {
      setError("Please fill in all fields and upload a dataset.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("features", features);
    formData.append("visualization_type", visualizationType);
    formData.append("dataset_file", datasetFile);

    try {
      const response = await fetch("https://api-test-237n.onrender.com/generate-visualization/", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        const blob = await response.blob(); // Convert response to blob
        const url = URL.createObjectURL(blob); // Create an object URL for the blob
        setImageData(url); // Store the object URL to display the image
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Generate Visualization</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Features (comma separated):
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Visualization Type:
          <input
            type="text"
            value={visualizationType}
            onChange={(e) => setVisualizationType(e.target.value)}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Upload Dataset:
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "block", marginTop: "5px" }}
          />
        </label>
      </div>
      <button onClick={handleGenerate} style={{ marginTop: "10px" }}>
        Generate Visualization
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {imageData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Visualization:</h2>
          <img
            src={imageData}
            alt="Generated Visualization"
            style={{
              maxWidth: "100%",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
            }}
          />
        </div>
      )}
      <PythonIDE/>
    </div>
  );
};
export default GenerateVisualization;
