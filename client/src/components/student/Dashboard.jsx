import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await api.get("/api/student/exams");
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
        <h1 className="mb-0">Available Exams</h1>
        <Link to="/student/profile" className="btn btn-outline-primary btn-sm">
          My Profile
        </Link>
      </div>

      {exams.length === 0 ? (
        <div className="alert alert-info">
          No exams available at the moment.
        </div>
      ) : (
        <div className="row">
          {exams.map((exam) => (
            <div key={exam._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{exam.subject_name}</h5>
                  <p className="card-text mb-1">
                    <strong>Questions:</strong> {exam.total_questions}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Time Limit:</strong> {exam.time_limit_minutes}{" "}
                    minutes
                  </p>
                  <Link
                    to={`/student/exams/${exam._id}/take-test`}
                    className="btn btn-success btn-sm"
                  >
                    Take Test
                  </Link>
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
