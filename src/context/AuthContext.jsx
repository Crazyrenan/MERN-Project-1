import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import our new api helper

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider (a component that will wrap our app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Is the user logged in?
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // For initial check
  const [errors, setErrors] = useState(null); // To display errors
  const navigate = useNavigate();

  // 3. Effect to run on app load
  // This checks if we have a token in localStorage
  useEffect(() => {
    if (token) {
      // In a real app, you'd verify this token with a backend
      // route like '/api/auth/me' to get user data.
      // For now, we'll just set loading to false.
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  // 4. Register function
  const register = async (email, password) => {
    try {
      setErrors(null);
      const res = await api.post('/auth/register', { email, password });
      const { token } = res.data;
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/'); // Redirect to dashboard after register
    } catch (err) {
      console.error('Register error', err.response?.data);
      setErrors(err.response?.data?.message || 'Failed to register');
    }
  };

  // 5. Login function
  const login = async (email, password) => {
    try {
      setErrors(null);
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/'); // Redirect to dashboard after login
    } catch (err) {
      console.error('Login error', err.response?.data);
      setErrors(err.response?.data?.message || 'Invalid credentials');
    }
  };

  // 6. Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  // 7. Pass all the values to the app
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        errors,
        setErrors,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 8. Export the context to be used by other components
export default AuthContext;

