import React, { useState } from "react";
// import Upload from './upload.png';

function UploadReport({ onAnalyze }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("File selected:", selectedFile);
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    console.log("File dropped:", selectedFile);
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= 5 * 1024 * 1024) {
          console.log("File accepted:", selectedFile);
          setFile(selectedFile);
          setFileName(selectedFile.name);
          setErrorMessage("");
        } else {
          setErrorMessage("File size cannot exceed 5 MB.");
          setFileName("");
          setFile(null);
        }
      } else {
        setErrorMessage(
          "Invalid file type. Please upload a PDF, JPEG, or PNG."
        );
        setFileName("");
        setFile(null);
      }
    } else {
      setErrorMessage("No file selected.");
    }
  };

  const handleFileUpload = async () => {
    console.log("File received for upload:", file);
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/analyze/analyze-report",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }
      const data = await response.json();
      console.log("data : ", data);
      const analysisResult = localStorage.setItem(
        "analysisResult",
        data.summary
      );
      onAnalyze(data.summary || "No summary available.");
      setUploadStatus("File uploaded and analyzed successfully!");
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      await handleFileUpload();
    } else {
      console.log("No file to upload");
      setErrorMessage("Please select a file before uploading.");
    }
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full flex flex-col items-center justify-center mx-auto my-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full flex flex-col items-center mb-4">
          <p className="font-poppins text-lg sm:text-xl font-semibold mt-4">
            Upload Report
          </p>
          <img
            src={"/upload.png"}
            alt="upload-icon"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-2 mt-3"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <label className="relative">
            <input
              type="file"
              accept=".pdf, .jpeg, .png"
              onChange={handleFileChange}
              className="hidden"
            />
            <span
              className="cursor-pointer text-base sm:text-lg font-poppins text-black"
              onClick={() => document.querySelector("input[type=file]").click()}
            >
              <span className="text-blue-600 text-sm">Browse</span> OR Drag and
              drop here
            </span>
          </label>
          {fileName && <p className="text-center mt-2 text-sm">{fileName}</p>}
          {errorMessage && (
            <p className="text-red-500 text-center font-bold text-sm">
              {errorMessage}
            </p>
          )}
          <p className="text-gray-600 text-xs text-center mt-2">
            PDF, JPEG, PNG - Max 5 MB
          </p>
          <button
            type="submit"
            className="w-full sm:w-64 h-8 sm:h-9 bg-blue-600 text-white font-poppins text-sm rounded-md mt-4 mb-4"
          >
            Upload and Analyze
          </button>
        </form>
        {uploadStatus && (
          <p className="text-center mt-4 text-sm">{uploadStatus}</p>
        )}
      </div>
    </div>
  );
}

export default UploadReport;
