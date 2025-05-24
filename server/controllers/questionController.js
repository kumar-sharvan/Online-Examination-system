const Question = require("../models/Question");
const Exam = require("../models/Exam");

exports.addQuestion = async (req, res) => {
  try {
    console.log("Received question data:", req.body); // Debug log

    const {
      exam_id,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option,
    } = req.body;

    // Validate correct option matches one of the options
    const options = [option1, option2, option3, option4];
    if (!options.includes(correct_option)) {
      return res.status(400).json({
        error: "Correct option must match one of the provided options",
      });
    }

    const newQuestion = new Question({
      exam_id,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_option,
    });

    const savedQuestion = await newQuestion.save();
    console.log("Saved question:", savedQuestion); // Debug log

    res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion,
    });
  } catch (err) {
    console.error("Error in addQuestion:", err);
    res.status(500).json({
      error: err.message || "Error adding question",
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionsByExam = async (req, res) => {
  try {
    const { examId } = req.params; // ✅ fixed key
    const questions = await Question.find({ exam_id: examId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
