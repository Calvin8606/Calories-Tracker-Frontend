import React, { useState } from "react";
import CenteredForm from "../components/CenteredForm";
import { loginUser } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth";

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
  setIsProfileComplete: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  setIsAuthenticated,
  setIsProfileComplete,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      if (result.jwt) {
        setAuthToken(result.jwt);
        localStorage.setItem(
          "profileComplete",
          JSON.stringify(result.profileComplete)
        );
        setIsAuthenticated(true);
        setIsProfileComplete(result.profileComplete);
        if (result.profileComplete) {
          navigate("/");
        } else {
          navigate("/questionnaire");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <CenteredForm title="Log In Page">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </CenteredForm>
    </div>
  );
};

export default LoginPage;
