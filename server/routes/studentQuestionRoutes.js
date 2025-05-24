const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const auth = require("../middlewares/auth");

router.use(auth("student"));

router.get("/exam/:examId", questionController.getQuestionsByExam);

module.exports = router;
