const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  total_questions: { type: Number, required: true },
  time_limit_minutes: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", examSchema);
