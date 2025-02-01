import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { executeCode } from "./src2/api";

/* Styled Components */
const Box = styled.div`
  width: 50%;
  border: 1px solid ${props => (props.isError ? "#FC8181" : "#333")}; /* red.500 equivalent */
  border-radius: 4px;
  padding: 8px;
  color: ${props => (props.isError ? "#FC8181" : "#000")}; /* red.400 equivalent */
  height: 75vh;
`;

const Text = styled.p`
  margin-bottom: 8px;
  font-size: 1.125rem; /* lg equivalent */
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #38A169; /* green.500 equivalent */
  background-color: transparent;
  color: #38A169;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover:not(:disabled) {
    background-color: #38A169;
    color: #fff;
  }
`;

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to run code", {
        position: "top-right",
        autoClose: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Text>Output</Text>
      <Button onClick={runCode} disabled={isLoading}>
        {isLoading ? "Loading..." : "Run Code"}
      </Button>
      <Box isError={isError}>
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Output;