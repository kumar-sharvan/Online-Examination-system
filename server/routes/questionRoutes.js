const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const auth = require("../middlewares/auth");

router.use(auth("admin"));

router.post("/", questionController.addQuestion);
router.get("/exam/:examId", questionController.getQuestionsByExam);
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
