import React, { useState } from "react";
import CenteredForm from "../components/CenteredForm";

interface LoginPageProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password); // Call the handleLogin prop with the form values
  };

  return (
    <CenteredForm title="Log In Page">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      </form>
    </CenteredForm>
  );
};

export default LoginPage;
