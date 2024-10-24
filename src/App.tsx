import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ErrorPage from "./pages/ErrorPage";
import { getAuthToken } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear token and update state
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <QuestionnairePage />
            </ProtectedRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
