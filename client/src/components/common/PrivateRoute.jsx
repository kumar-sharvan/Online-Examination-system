import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.isAdmin !== (role === "admin")) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
