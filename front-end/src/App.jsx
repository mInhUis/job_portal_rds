import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import EmDashBoardPage from './pages/EmDashBoardPage';
import Home from './pages/Home';
import { jwtDecode } from 'jwt-decode';
import { RoleRedirect } from './pages/components/RoleRedirect'; 
import PostJobPage from './pages/PostJobPage';
import EditJobPage from './pages/EditJobPage';

function App() {

  const token = localStorage.getItem("token");
    let userRole = "";

  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<RoleRedirect userRole={userRole} />} // ✅ JSX element
        />
        <Route
          path="/v2"
          element={<RoleRedirect userRole={userRole} />} // ✅ JSX element
        />
        <Route
          path="/post-job"
          element={userRole === "employer" ? <PostJobPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-job/:id"
          element={userRole === "employer" ? <EditJobPage /> : <Navigate to="/" />}
        /> 
          </Routes>
    </BrowserRouter>
  );
}
export default App;