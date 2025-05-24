import { useLocation, useNavigate } from "react-router-dom";

const SubmitTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, examName } = location.state || {};

  if (!score && !examName) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning mb-4">No test results found</div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/student")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4">Test Submitted!</h2>
        <div className="mb-3 fs-5">
          <strong>Exam:</strong> {examName}
        </div>
        <div className="mb-4 fs-4">
          <strong>Your Score:</strong> {score}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/student")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SubmitTest;
