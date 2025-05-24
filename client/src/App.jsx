// client/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/common/Layout";
import Home from "./components/common/Home";

// Admin Components
import AdminLogin from "./components/auth/AdminLogin";
import AdminDashboard from "./components/admin/Dashboard";
import CreateExam from "./components/admin/CreateExam";
import CreateQuestion from "./components/admin/CreateQuestion";
import ManageQuestions from "./components/admin/ManageQuestions";
import ViewQuestions from "./components/admin/ViewQuestions";
import DeleteStudent from "./components/admin/DeleteStudent";

// Student Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import StudentDashboard from "./components/student/Dashboard";
import Profile from "./components/student/Profile";
import TakeTest from "./components/student/TakeTest";
import SubmitTest from "./components/student/SubmitTest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute role="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="create-exam" element={<CreateExam />} />
              {/* Add this nested route */}
              <Route
                path="exams/:examId/create-question"
                element={<CreateQuestion />}
              />
              <Route
                path="exams/:examId/questions"
                element={<ManageQuestions />}
              />
              <Route
                path="exams/:examId/view-questions"
                element={<ViewQuestions />}
              />
              <Route path="delete-students" element={<DeleteStudent />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<PrivateRoute role="student" />}>
              <Route index element={<StudentDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="exams/:examId/take-test" element={<TakeTest />} />
              <Route path="submit-test" element={<SubmitTest />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
