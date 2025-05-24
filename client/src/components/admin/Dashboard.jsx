import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await api.delete(`/api/admin/exams/${id}`);
        setExams(exams.filter((exam) => exam._id !== id));
      } catch (err) {
        console.error("Error deleting exam:", err);
      }
    }
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await api.get("/api/admin/exams");
        setExams(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Admin Dashboard</h1>
        <div>
          <Link to="/admin/create-exam" className="btn btn-primary me-2">
            Create New Exam
          </Link>
          <Link to="/admin/delete-students" className="btn btn-secondary">
            Manage Students
          </Link>
        </div>
      </div>

      <h3 className="mb-4">All Exams</h3>

      {exams.length === 0 ? (
        <div className="alert alert-info">No exams found. Create one now!</div>
      ) : (
        <div className="row">
          {exams.map((exam) => (
            <div className="col-md-6 col-lg-4 mb-4" key={exam._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{exam.subject_name}</h5>
                  <p className="card-text mb-1">
                    <strong>Total Questions:</strong> {exam.total_questions}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Time Limit:</strong> {exam.time_limit_minutes} mins
                  </p>

                  <div className="d-grid gap-2">
                    <Link
                      to={`/admin/exams/${exam._id}/questions`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Add Questions
                    </Link>
                    <Link
                      to={`/admin/exams/${exam._id}/view-questions`}
                      className="btn btn-outline-info btn-sm"
                    >
                      View Questions
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteExam(exam._id)}
                    >
                      Delete Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
