import React, { useState } from "react";
import UploadReport from "../../common/uploadFIle";
import { KanbanBoard } from "./kanban-board";
import { Spinner } from "../../common/Spinner";

export const GeneratePlan = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [loading, setLoading] = useState(false);

  const analysisResult = localStorage.getItem("analysisResult");

  const handleModelOpen = () => {
    setModalOpen(true);
  };

  const handleModelClose = () => {
    setModalOpen(false);
  };

  const handleAnalyze = (result) => {
    handleModelClose();
  };

  const handleViewTreatmentPlan = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));
    setLoading(false);
    setShowKanban(true);
  };

  if (showKanban) {
    return <KanbanBoard />;
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 sm:top-16 lg:top-20 xl:top-24 flex items-center p-3 sm:p-4 lg:p-5">
        <p className="font-poppins text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold m-0 text-center">
          Generate Plan with AI
        </p>
        <img
          src={"/tool.png"}
          alt="Tool Icon"
          className="ml-2 w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
        />
      </div>
      <div className="bg-white font-poppins rounded-3xl shadow-xl border-gray-200 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto p-8 text-left relative sm:-bottom-52 md:-bottom-60 lg:-bottom-72 left-5">
        <div className="border-b border-gray-300 mb-5">
          <h2 className="text-xl font-bold text-black mt-0 mb-2">
            Personalized AI-Driven Treatment Plan
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            A tailored Medical Solution By AI to Help you with your treatment.
          </p>
        </div>
        <div className="border-b border-gray-300 mb-5 font-poppins">
          <h3 className="text-lg font-semibold text-black mb-5">
            Analysis Results
          </h3>
          <div className="text-gray-600 text-base text-justify">
            {analysisResult.split("\n").map((line, index) => {
              line = line.trim();

              if (line.startsWith("•")) {
                const boldRegex = /\*\*(.*?)\*\*/g;
                const formattedLine = line.replace(
                  boldRegex,
                  "<strong>$1</strong>"
                );
                return (
                  <p
                    key={index}
                    className="my-2"
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              }

              const boldRegex = /\*\*(.*?)\*\*/g;
              const formattedLine = line.replace(
                boldRegex,
                "<strong>$1</strong>"
              );

              return (
                <p
                  key={index}
                  className="my-2"
                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-start mb-2">
          <button
            className="bg-blue-600 min-w-[200px] text-white rounded-md py-3 px-6 font-poppins transition duration-300 hover:bg-blue-700 flex items-center justify-between"
            onClick={handleViewTreatmentPlan}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Spinner size="5" /> // Replace with your spinner component
            ) : (
              <>
                <span>View Treatment Plan</span>
                <img
                  src={"/chevron.png"}
                  alt="arrow Icon"
                  className="w-5 h-5 ml-2"
                />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="absolute top-[30%] sm:top-[30%] md:top-[35%] lg:top-[40%] right-10 sm:right-18 md:right-26 lg:right-28 mb-0 z-10">
        <button
          className="bg-blue-600 text-white rounded-md py-2 px-6 min-w-[200px] font-medium transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={handleModelOpen}
        >
          <img
            src={"/file-upload.png"}
            alt="file Icon"
            className="-ml-2 w-6 h-6"
          />
          Upload Reports
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="rounded-lg w-11/12 sm:w-[500px] md:w-[400px] lg:w-[350px] h-auto p-5 shadow-lg relative">
            <a
              className="absolute top-4 right-6 sm:-top-20 sm:right-8 md:-top-28 md:right-11 cursor-pointer z-40 p-2"
              onClick={handleModelClose}
              href="#"
            >
              <img src={"/close.png"} alt="Close Icon" className="w-4 h-4" />
            </a>
            <UploadReport onAnalyze={handleAnalyze} />
          </div>
        </div>
      )}
    </div>
  );
};
