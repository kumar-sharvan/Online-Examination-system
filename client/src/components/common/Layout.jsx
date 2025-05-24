import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white p-3 mb-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="h3 mb-0 text-decoration-none" href="/">
            Online Examination System
          </a>
          <nav>
            {user ? (
              <>
                {user.isAdmin ? (
                  <Link
                    to="/admin"
                    className="btn btn-outline-light btn-sm me-2"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/student"
                    className="btn btn-outline-light btn-sm me-2"
                  >
                    Student Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-light btn-sm"
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="btn btn-outline-light btn-sm">
                Home
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container flex-grow-1">{children}</main>

      <footer className="bg-light text-center py-3 mt-auto shadow-top">
        <p className="mb-0 text-muted">
          © {new Date().getFullYear()} Online Examination System
        </p>
      </footer>
    </div>
  );
};

export default Layout;
