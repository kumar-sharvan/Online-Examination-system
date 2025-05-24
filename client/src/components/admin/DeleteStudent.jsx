import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/api/admin/students");
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/api/admin/students/${id}`);
        setStudents(students.filter((student) => student._id !== id));
        setMessage("Student deleted successfully!");
        setMsgType("success");
      } catch (err) {
        setMessage(err.response?.data?.error || "Error deleting student");
        setMsgType("error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Manage Students</h2>

        {message && (
          <div
            className={`alert alert-${
              msgType === "success" ? "success" : "danger"
            } d-flex justify-content-between`}
          >
            <span>{message}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setMessage("")}
            ></button>
          </div>
        )}

        {students.length === 0 ? (
          <div className="alert alert-info">No students found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student._id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(student._id)}
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
          <strong>Total Students:</strong> {students.length}
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

export default DeleteStudent;
