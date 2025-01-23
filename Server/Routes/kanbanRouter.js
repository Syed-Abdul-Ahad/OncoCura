const express = require("express");
const kanbanController = require("../Controller/kanbanController");

const router = express.Router();

router.post("/generate-kanban", kanbanController.generateKanban);

module.exports = router;
