import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const ViewQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);

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
  }, [examId, navigate]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">View Exam Questions</h2>
        {exam && (
          <p className="text-muted mb-4">
            <strong>Subject:</strong> {exam.subject_name}
          </p>
        )}

        {questions.length === 0 ? (
          <div className="alert alert-warning">
            No questions found for this exam.
          </div>
        ) : (
          <div className="accordion" id="questionsAccordion">
            {questions.map((question, index) => (
              <div className="accordion-item mb-3" key={question._id}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    Q{index + 1}: {question.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#questionsAccordion"
                >
                  <div className="accordion-body">
                    <ul className="list-group mb-2">
                      <li className="list-group-item">{question.option1}</li>
                      <li className="list-group-item">{question.option2}</li>
                      <li className="list-group-item">{question.option3}</li>
                      <li className="list-group-item">{question.option4}</li>
                    </ul>
                    <p>
                      <strong>Correct Answer:</strong> {question.correct_option}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

export default ViewQuestions;
