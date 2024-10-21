import React, { useState } from "react";
import CenteredForm from "../components/CenteredForm";
import { registerUser } from "../apis/api";

interface RegisterPageProps {
  handleRegister: (
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>(""); // Optional
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Optional
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await registerUser({
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      setSuccess(true);
      // Clear form fields
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <CenteredForm title="Register">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
          required
        />
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          placeholder="Middle Name (Optional)"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number (Optional)"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 border rounded-md focus:outline-none focus:border-blue-600"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Registration successful!</p>}
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </CenteredForm>
  );
};

export default RegisterPage;
