import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const CreateQuestion = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    exam_id: examId,
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/questions", formData);

      if (response.data && response.data.question) {
        navigate(`/admin/exams/${examId}/questions`, {
          state: { shouldRefresh: true },
        });
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add question");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">Add New Question</h2>
        <p className="text-muted">Fill the question and options carefully</p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea
              className="form-control"
              name="question"
              rows="3"
              value={formData.question}
              onChange={handleChange}
              required
              placeholder="Enter the question text"
            />
          </div>

          {[1, 2, 3, 4].map((num) => (
            <div className="mb-3" key={num}>
              <label className="form-label">Option {num}</label>
              <input
                type="text"
                className="form-control"
                name={`option${num}`}
                value={formData[`option${num}`]}
                onChange={handleChange}
                required
                placeholder={`Option ${num}`}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="form-label">Correct Option</label>
            <select
              className="form-select"
              name="correct_option"
              value={formData.correct_option}
              onChange={handleChange}
              required
            >
              <option value="">Select correct option</option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={formData[`option${num}`]}>
                  Option {num}: {formData[`option${num}`]}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Add Question
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/admin/exams/${examId}/questions`)}
            >
              Back to Questions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
