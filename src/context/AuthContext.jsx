import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Changed absolute path back to a relative path
import api from '../api.js'; // Use relative path
import { jwtDecode } from 'jwt-decode'; // We need this to read the user data from the token

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // Used for initial auth check
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // 3. Effect to run on app load to check for existing token
  useEffect(() => {
    try {
      if (token) {
        // If token exists, decode it to get user info
        const decodedToken = jwtDecode(token);
        
        // Check if token is expired
        const isExpired = decodedToken.exp * 1000 < Date.now();
        
        if (isExpired) {
          // Token is expired, log user out
          logout();
        } else {
          // Token is valid, set user state
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
          });
        }
      }
    } catch (error) {
      // Invalid token (e.g., malformed)
      console.error("Invalid token:", error);
      logout(); // Clear the bad token
    } finally {
      setLoading(false); // Done checking auth
    }
  }, [token]);

  // 4. Register function
  const register = async (username, email, password) => {
    setLoading(true);
    setErrors(null);
    try {
      // Pass username, email, and password to the API
      const res = await api.post('/auth/register', { username, email, password });
      
      const { token: newToken, user: newUser } = res.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser); // Set the user state
      setLoading(false);
      navigate('/'); // Navigate to dashboard on success
    } catch (err) {
      console.error('Register error', err.response?.data);
      setErrors(err.response?.data?.message || 'Failed to register');
      setLoading(false);
    }
  };

  // 5. Login function
  const login = async (email, password) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      const { token: newToken, user: newUser } = res.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser); // Set the user state
      setLoading(false);
      navigate('/'); // Navigate to dashboard on success
    } catch (err) {
      console.error('Login error', err.response?.data);
      setErrors(err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  // 6. Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  // 7. Pass all values to children
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
      {/* Don't render children until initial auth check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 8. Export the context as default (to match your import)
export default AuthContext;


