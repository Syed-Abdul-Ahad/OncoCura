import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import Upload from './upload.png';

function UploadReport({ setModalOpen }) {
  const [fileStatus, setFileStatus] = useState({
    file: null,
    fileName: "",
    uploadStatus: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const { setSummary, summary } = useGlobalContext();
  const params = useParams();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= 5 * 1024 * 1024) {
          setFileStatus(() => ({
            file: selectedFile,
            fileName: selectedFile.name,
            uploadStatus: "",
          }));

          setErrorMessage("");
        } else {
          setErrorMessage("File size cannot exceed 5 MB.");
          setFileStatus(() => ({
            file: null,
            fileName: "",
            uploadStatus: "",
          }));
        }
      } else {
        setErrorMessage(
          "Invalid file type. Please upload a PDF, JPEG, or PNG."
        );
        setFileStatus(() => ({
          file: null,
          fileName: "",
          uploadStatus: "",
        }));
      }
    } else {
      setErrorMessage("No file selected.");
    }
  };

  useEffect(() => {
    if (summary) {
      handleSummaryUpload();
    }
  }, [summary]);

  const handleFileUpload = async () => {
    setFileStatus((prev) => ({
      ...prev,
      uploadStatus: "Uploading file...",
    }));
    const formData = new FormData();
    formData.append("file", fileStatus.file);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/analyze/analyze-report",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setSummary(data.summary);

      setFileStatus(() => ({
        file: null,
        fileName: "",
        uploadStatus: "File uploaded and analyzed successfully!",
      }));

      setTimeout(() => setModalOpen(false), 4000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileStatus(() => ({
        file: null,
        fileName: "",
        uploadStatus: "Error uploading file. Please try again.",
      }));
    }
  };

  const handleSummaryUpload = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/record/${params?.id}`,
        { summary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log("Error uploading summary: ", e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fileStatus.file) {
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
          {fileStatus.fileName && (
            <p className="text-center mt-2 text-sm">{fileStatus?.fileName}</p>
          )}
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
        {fileStatus?.uploadStatus && (
          <p className="text-center mt-4 text-sm">{fileStatus.uploadStatus}</p>
        )}
      </div>
    </div>
  );
}

export default UploadReport;
