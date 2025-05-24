import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const TakeTest = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examRes, questionsRes] = await Promise.all([
          api.get(`/api/student/exams/${examId}`),
          api.get(`/api/student-questions/exam/${examId}`),
        ]);

        setExam(examRes.data);
        setQuestions(questionsRes.data);
        setTimeLeft(examRes.data.time_limit_minutes * 60);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error loading exam or questions");
        navigate("/student");
      }
    };

    fetchData();
  }, [examId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/student/submit-test", {
        exam_id: examId,
        answers,
      });

      navigate("/student/submit-test", {
        state: {
          examName: exam.subject_name,
          score: res.data.score,
        },
      });
    } catch (err) {
      console.error("Error submitting test:", err);
      alert("Failed to submit test. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-4 mb-5">
      <h1 className="mb-3">{exam.subject_name} Test</h1>
      <p className="fs-5 mb-4">
        Time Left:{" "}
        <span className="fw-bold">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((q, index) => (
          <div key={q._id} className="mb-4">
            <h5 className="mb-3">
              Q{index + 1}: {q.question}
            </h5>

            {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
              const optionId = `q${q._id}_opt${i}`;
              return (
                <div className="form-check" key={optionId}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={optionId}
                    name={q._id}
                    value={opt}
                    onChange={() => handleAnswerSelect(q._id, opt.trim())}
                    checked={answers[q._id] === opt.trim()}
                    required={i === 0} // ensure at least one option is required
                  />
                  <label className="form-check-label" htmlFor={optionId}>
                    {opt}
                  </label>
                </div>
              );
            })}
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default TakeTest;
