const express = require("express");
const multer = require("multer");
const analysisController = require("../Controller/analysisController");

const router = express.Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

router.post(
  "/analyze-report",
  upload.single("file"),
  analysisController.analyzeFile
);

module.exports = router;
