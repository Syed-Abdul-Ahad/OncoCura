const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// Initialize Google AI FileManager with API key
const apiKey = process.env.VITE_GEMINI_API_KEY;
const fileManager = new GoogleAIFileManager(apiKey);

exports.processFile = async (file) => {
  const tempFilePath = path.join(os.tmpdir(), file.originalname);

  await fs.writeFile(tempFilePath, file.buffer);
  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType: file.mimetype,
    displayName: file.originalname,
  });

  await fs.unlink(tempFilePath); // Clean up temp file
  return uploadResponse;
};
