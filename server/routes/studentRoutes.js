const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middlewares/auth");

router.use(auth("student"));

router.get("/exams", studentController.getExams);
router.get("/exams/:id", studentController.getExamDetails);
router.post("/submit-test", studentController.submitTest);
router.get("/profile", studentController.getProfile);

module.exports = router;
