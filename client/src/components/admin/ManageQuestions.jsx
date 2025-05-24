import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";

const ManageQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examRes, questionsRes] = await Promise.all([
          api.get(`/api/admin/exams/${examId}`),
          api.get(`/api/questions/exam/${examId}`),
        ]);
        setExam(examRes.data);
        setQuestions(questionsRes.data);
      } catch (err) {
        console.error(err);
        navigate("/admin");
      }
    };
    fetchData();
  }, [examId, navigate, refreshCount]);

  useEffect(() => {
    if (location.state?.shouldRefresh) {
      setRefreshCount((prev) => prev + 1);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await api.delete(`/api/questions/${questionId}`);
        setQuestions(questions.filter((q) => q._id !== questionId));
        setMessage("Question deleted successfully");
      } catch (err) {
        setMessage(err.response?.data?.error || "Error deleting question");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">Manage Exam Questions</h2>
        {exam && (
          <p className="text-muted">
            <strong>Subject:</strong> {exam.subject_name}
          </p>
        )}

        {message && (
          <div className="alert alert-info d-flex justify-content-between">
            <span>{message}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage("")}
            ></button>
          </div>
        )}

        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/admin/exams/${examId}/create-question`)}
          >
            Add New Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="alert alert-warning">
            No questions found for this exam.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Question</th>
                  <th>Correct Option</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.question}</td>
                    <td>{question.correct_option}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(question._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-3">
          <strong>Total Questions:</strong> {questions.length}
        </div>

        <div className="mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;
