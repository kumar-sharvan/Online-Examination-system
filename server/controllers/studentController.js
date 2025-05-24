const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Question = require("../models/Question"); // Add this at the top
const Student = require("../models/Student");

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitTest = async (req, res) => {
  try {
    const { exam_id, answers } = req.body;
    const student_id = req.user.id;

    const questions = await Question.find({ exam_id });
    let score = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correct_option) {
        score++;
      }
    });

    const result = new Result({ student_id, exam_id, score });
    await result.save();

    res.json({ message: "Test submitted successfully", score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Fetch the student's test results
    const results = await Result.find({ student_id: req.user.id })
      .populate("exam_id", "subject_name")
      .sort({ submitted_at: -1 });

    res.json({ ...student.toObject(), results });
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ error: "Server error" });
  }
};
