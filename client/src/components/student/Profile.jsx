import { useState, useEffect } from "react";
import api from "../../utils/api";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/student/profile");
        setStudent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>
      {student && (
        <div>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <h3 className="mt-5 mb-3">My Test Results</h3>
          {student.results && student.results.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {student.results.map((result) => (
                    <tr key={result._id}>
                      <td>{result.exam_id?.subject_name}</td>
                      <td>{result.score}</td>
                      <td>{new Date(result.submitted_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No results found yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
