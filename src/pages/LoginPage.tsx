import React, { useState } from "react";
import CenteredForm from "../components/CenteredForm";
import { loginUser } from "../apis/api";
import { useNavigate } from "react-router-dom";

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
        console.log("Profile complete:", result.profileComplete);
        // Save token to local storage
        localStorage.setItem("token", result.jwt);
        setIsAuthenticated(true);
        if (result.profileComplete) {
          setIsProfileComplete(true);
          navigate("/");
        } else {
          navigate("/questionnaire");
        }
      }
      console.log("Login result:", result);
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
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
  );
};

export default LoginPage;
