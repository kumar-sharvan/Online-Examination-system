import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const CreateExam = () => {
  const [formData, setFormData] = useState({
    subject_name: "",
    total_questions: "",
    time_limit_minutes: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/exams", formData);
      setMessage("✅ Subject created successfully!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Error creating exam");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">Create Subject/Exam</h2>
        <p className="text-muted">
          Fill in the details to create a new exam subject
        </p>

        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Subject Name</label>
            <input
              type="text"
              className="form-control"
              name="subject_name"
              value={formData.subject_name}
              onChange={handleChange}
              required
              placeholder="e.g. Mathematics"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Questions</label>
            <input
              type="number"
              className="form-control"
              name="total_questions"
              value={formData.total_questions}
              onChange={handleChange}
              required
              placeholder="e.g. 10"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time Limit (in minutes)</label>
            <input
              type="number"
              className="form-control"
              name="time_limit_minutes"
              value={formData.time_limit_minutes}
              onChange={handleChange}
              required
              placeholder="e.g. 30"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Create Subject
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin")}
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
