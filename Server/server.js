// const env = require('dotenv')
// env.config({path:'./config.env'})


// const app = require('./app')


// const port = 3000
// app.listen(port,'0.0.0.0',()=>{
//     console.log("server is running on port "+ port)
// })


// import express from 'express';
// import cors from 'cors';
// import multer from 'multer';
// import fs from 'fs/promises'; // Use promises API
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GoogleAIFileManager } from '@google/generative-ai/server';
// import dotenv from 'dotenv';
// import path from 'path';
// import os from 'os';
// import compression from 'compression'; // Import compression middleware

// // Load environment variables from .env file
// dotenv.config();

// // Initialize app and constants
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(compression()); // Add compression middleware for response size optimization
// app.use(cors());
// app.use(express.json());

// // Middleware to measure response time
// app.use((req, res, next) => {
//   const start = Date.now(); // Start time
//   res.on('finish', () => {
//     const duration = Date.now() - start; // Calculate duration
//     console.log(`Response time for ${req.method} ${req.url}: ${duration}ms`);
//   });
//   next(); // Call the next middleware
// });

// // Set up multer for file uploads (memory storage)
// const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// // Initialize Google Generative AI with API key
// const apiKey = process.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);
// const fileManager = new GoogleAIFileManager(apiKey);

// // Helper function to handle file processing
// const processFile = async (file) => {
//   const tempFilePath = path.join(os.tmpdir(), file.originalname);
  
//   // Use a direct approach to upload without writing to disk if possible
//   await fs.writeFile(tempFilePath, file.buffer);
//   const uploadResponse = await fileManager.uploadFile(tempFilePath, {
//     mimeType: file.mimetype,
//     displayName: file.originalname,
//   });

//   await fs.unlink(tempFilePath); // Clean up temp file
//   return uploadResponse;
// };

// // Analyze uploaded file
// app.post('/api/analyze', upload.single('file'), async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//     const uploadResponse = await processFile(file);
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const prompt = 'You are an expert in analyzing medical documents. Please provide a comprehensive analysis of the uploaded report. Include key findings, recommendations, and a summary.';
    
//     const result = await model.generateContent([  
//       {  
//         fileData: {  
//           mimeType: uploadResponse.file.mimeType,  
//           fileUri: uploadResponse.file.uri,  
//         },  
//       },  
//       { text: prompt },  
//     ]);

//     res.json({ summary: result.response.text() });
//   } catch (error) {
//     console.error('Error analyzing document:', error);
//     res.status(500).json({ error: 'An error occurred while processing the document.' });
//   }
// });

// // Generate Kanban board from analysis result
// app.post('/api/generate-kanban', async (req, res) => {
//   const { analysisResult } = req.body;

//   if (!analysisResult) {
//     return res.status(400).json({ error: 'No analysis result provided' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const prompt = `You are an AI tasked with creating a Kanban board for a medical treatment plan based on the following analysis: ${analysisResult}. 

//     Structure the output in valid JSON format with three columns (Todo, Doing, Done) and the following specific tasks:
    
//     - Gather patient medical history and conduct a comprehensive physical examination.
//     - Order and analyze necessary laboratory tests to assess the patient's current condition.
//     - Develop a personalized treatment plan based on the analysis of the patient's condition and test results.
//     - Discuss the proposed treatment plan with the patient, addressing their concerns and obtaining informed consent.
//     - Schedule initial consultations and appointments with relevant specialists if required.

//     Provide the output as follows:
//     {
//         "columns": [
//             { "id": "todo", "title": "Todo" },
//             { "id": "doing", "title": "Work in progress" },
//             { "id": "done", "title": "Done" }
//         ],
//         "tasks": [
//             { "id": "1", "columnId": "todo", "content": "Gather patient medical history and conduct a comprehensive physical examination." },
//             { "id": "2", "columnId": "todo", "content": "Order and analyze necessary laboratory tests to assess the patient's current condition." },
//             { "id": "3", "columnId": "doing", "content": "Develop a personalized treatment plan based on the analysis of the patient's condition and test results." },
//             { "id": "4", "columnId": "doing", "content": "Discuss the proposed treatment plan with the patient, addressing their concerns and obtaining informed consent." },
//             { "id": "5", "columnId": "done", "content": "Schedule initial consultations and appointments with relevant specialists if required." }
//         ]
//     }`;

//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     // Sanitize and parse the response
//     const sanitizedText = text.replace(/```json/g, '')
//                               .replace(/```/g, '')
//                               .replace(/\n/g, '')
//                               .trim();

//     try {
//       const parsedResponse = JSON.parse(sanitizedText);
//       res.json(parsedResponse);
//     } catch (jsonError) {
//       console.error('JSON parsing error:', jsonError);
//       console.error('Original response:', text);
//       res.status(500).json({ error: 'Failed to parse Kanban response.' });
//     }
//   } catch (error) {
//     console.error('Error generating Kanban tasks:', error);
//     res.status(500).json({ error: 'An error occurred while generating Kanban tasks.' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs/promises'); // Use promises API
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const compression = require('compression'); // Import compression middleware

// Load environment variables from .env file
dotenv.config();

// Initialize app and constants
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Add compression middleware for response size optimization
app.use(cors());
app.use(express.json());

// Middleware to measure response time
app.use((req, res, next) => {
  const start = Date.now(); // Start time
  res.on('finish', () => {
    const duration = Date.now() - start; // Calculate duration
    console.log(`Response time for ${req.method} ${req.url}: ${duration}ms`);
  });
  next(); // Call the next middleware
});

// Set up multer for file uploads (memory storage)
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// Initialize Google Generative AI with API key
const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

// Helper function to handle file processing
const processFile = async (file) => {
  const tempFilePath = path.join(os.tmpdir(), file.originalname);
  
  // Use a direct approach to upload without writing to disk if possible
  await fs.writeFile(tempFilePath, file.buffer);
  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType: file.mimetype,
    displayName: file.originalname,
  });

  await fs.unlink(tempFilePath); // Clean up temp file
  return uploadResponse;
};

// Analyze uploaded file
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const uploadResponse = await processFile(file);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'You are an expert in analyzing medical documents. Please provide a comprehensive analysis of the uploaded report. Include key findings, recommendations, and a summary.';
    
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
    console.error('Error analyzing document:', error);
    res.status(500).json({ error: 'An error occurred while processing the document.' });
  }
});

// Generate Kanban board from analysis result
app.post('/api/generate-kanban', async (req, res) => {
  const { analysisResult } = req.body;

  if (!analysisResult) {
    return res.status(400).json({ error: 'No analysis result provided' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are an AI tasked with creating a Kanban board for a medical treatment plan based on the following analysis: ${analysisResult}. 

    Structure the output in valid JSON format with three columns (Todo, Doing, Done) and the following specific tasks:
    
    - Gather patient medical history and conduct a comprehensive physical examination.
    - Order and analyze necessary laboratory tests to assess the patient's current condition.
    - Develop a personalized treatment plan based on the analysis of the patient's condition and test results.
    - Discuss the proposed treatment plan with the patient, addressing their concerns and obtaining informed consent.
    - Schedule initial consultations and appointments with relevant specialists if required.

    Provide the output as follows:
    {
        "columns": [
            { "id": "todo", "title": "Todo" },
            { "id": "doing", "title": "Work in progress" },
            { "id": "done", "title": "Done" }
        ],
        "tasks": [
            { "id": "1", "columnId": "todo", "content": "Gather patient medical history and conduct a comprehensive physical examination." },
            { "id": "2", "columnId": "todo", "content": "Order and analyze necessary laboratory tests to assess the patient's current condition." },
            { "id": "3", "columnId": "doing", "content": "Develop a personalized treatment plan based on the analysis of the patient's condition and test results." },
            { "id": "4", "columnId": "doing", "content": "Discuss the proposed treatment plan with the patient, addressing their concerns and obtaining informed consent." },
            { "id": "5", "columnId": "done", "content": "Schedule initial consultations and appointments with relevant specialists if required." }
        ]
    }`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // Sanitize and parse the response
    const sanitizedText = text.replace(/```json/g, '')
                              .replace(/```/g, '')
                              .replace(/\n/g, '')
                              .trim();

    try {
      const parsedResponse = JSON.parse(sanitizedText);
      res.json(parsedResponse);
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      console.error('Original response:', text);
      res.status(500).json({ error: 'Failed to parse Kanban response.' });
    }
  } catch (error) {
    console.error('Error generating Kanban tasks:', error);
    res.status(500).json({ error: 'An error occurred while generating Kanban tasks.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
