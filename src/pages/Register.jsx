import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Fix the import casing to match the file name 'AuthContext.jsx'
import AuthContext from '../context/authContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState(''); // Local form error
  const { register, errors: authError, loading } = useContext(AuthContext); // Get context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous errors

    if (!username || !email || !password) {
      setFormError('Please fill in all fields.');
      return;
    }

    try {
      // Call the register function from the context
      // Pass an object with username, email, password
      await register(username, email, password);
      
      // On success, AuthContext should handle navigation
      // We check for authError *after* await
      if (!authError) {
         navigate('/'); // Manually navigate if context doesn't
      }

    } catch (err) {
      // Error is already set in AuthContext
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Show auth error from context */}
          {authError && <p className="text-sm text-red-400 text-center">{authError}</p>}
          {/* Show local form error */}
          {formError && <p className="text-sm text-red-400 text-center">{formError}</p>}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="yourusername"
            />
          </div>
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

