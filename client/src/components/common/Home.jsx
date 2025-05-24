import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-3">Welcome to Online Examination System</h1>
      <p className="lead mb-5">
        A modern platform for conducting and taking exams
      </p>

      <div>
        <h2 className="mb-4">Get Started</h2>

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <Link to="/admin/login" className="text-decoration-none">
              <div className="card shadow h-100 p-4 text-primary">
                <h3>Admin Login</h3>
                <p className="text-muted">Login to manage exams</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/login" className="text-decoration-none">
              <div className="card shadow h-100 p-4 text-success">
                <h3>Student Login</h3>
                <p className="text-muted">Access your exams</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/register" className="text-decoration-none">
              <div className="card shadow h-100 p-4 text-info">
                <h3>Student Register</h3>
                <p className="text-muted">Create new account</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
