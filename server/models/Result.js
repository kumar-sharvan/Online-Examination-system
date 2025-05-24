const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  score: { type: Number, required: true },
  submitted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
