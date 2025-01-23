const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI with API key
const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

exports.generateKanban = async (req, res) => {
  const { analysisResult } = req.body;

  if (!analysisResult) {
    return res.status(400).json({ error: "No analysis result provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Based on the following analysis: "${analysisResult}",

    Create a Kanban board in JSON format for a medical treatment plan. The JSON structure should include:
    
    - Three columns: "Todo", "Doing", and "Done".
    - Tasks with specific IDs, assigned to these columns, and brief descriptions.
    
    Respond **only** in JSON format. Do not include any extra explanations. Use this template:
    
    {
        "columns": [
            { "id": "todo", "title": "Todo" },
            { "id": "doing", "title": "Doing" },
            { "id": "done", "title": "Done" }
        ],
        "tasks": [
            { "id": "1", "columnId": "todo", "content": "Gather patient medical history" },
            { "id": "2", "columnId": "doing", "content": "Analyze laboratory tests" },
            ...
        ]
    }`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const sanitizedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\n/g, "")
      .trim();

    try {
      const parsedResponse = JSON.parse(sanitizedText);
      res.json(parsedResponse);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      console.error("Original response:", text);
      res.status(500).json({ error: "Failed to parse Kanban response." });
    }
  } catch (error) {
    console.error("Error generating Kanban tasks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating Kanban tasks." });
  }
};
