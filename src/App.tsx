import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { loginUser } from './apis/api';
import { registerUser } from './apis/api';
import { getAuthToken } from './utils/auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken(); // Assume this function checks local storage for a token
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginUser({ email, password });
      setIsAuthenticated(true);
      navigate('/');
      console.log('Login result:', result);
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  
  const handleRegister = async (
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => {
    try {
      const result = await registerUser({
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      navigate('/login');
      console.log('Registration result:', result);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    // Clear token and update state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); 
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage handleRegister={handleRegister} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
