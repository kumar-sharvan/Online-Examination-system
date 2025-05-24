const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");

router.use(auth("admin"));

// Get single exam
router.get("/exams/:id", adminController.getExamById);

router.post("/exams", adminController.createExam);
router.get("/exams", adminController.getExams);
router.delete("/exams/:id", adminController.deleteExam);
router.get("/students", adminController.getStudents);
router.delete("/students/:id", adminController.deleteStudent);

module.exports = router;
