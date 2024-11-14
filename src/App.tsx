import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SideNavBar from "./components/SideNavBar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const profileComplete = JSON.parse(
        localStorage.getItem("profileComplete") || "false"
      );
      setIsProfileComplete(profileComplete);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after checking authentication
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    navigate("/");
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can style this as needed
  }

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <SideNavBar
        isAuthenticated={isAuthenticated}
        isProfileComplete={isProfileComplete}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setIsProfileComplete={setIsProfileComplete}
            />
          }
        />
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <QuestionnairePage setIsProfileComplete={setIsProfileComplete} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage setIsProfileComplete={setIsProfileComplete} />
            </ProtectedRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
