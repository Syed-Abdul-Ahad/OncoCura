const { GoogleGenerativeAI } = require("@google/generative-ai");
const { processFile } = require("../utils/fileProcessing");

// Initialize Google Generative AI with API key
const apiKey = 'AIzaSyD6gKCWI96vIPB5rDXYwd6aoekHNBMrEeE';
const genAI = new GoogleGenerativeAI(apiKey);

exports.analyzeFile = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const uploadResponse = await processFile(file);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "You are an expert in analyzing medical documents. Please provide a comprehensive analysis of the uploaded report. Include key findings, recommendations, and a summary.";

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ]);

    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error analyzing document:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the document." });
  }
};
