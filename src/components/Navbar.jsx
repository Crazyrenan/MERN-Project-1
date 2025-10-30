import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

function Navbar() {
  // Get user and logout function from our Auth context
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo - links to dashboard if logged in, else to login */}
        <Link to={user ? '/' : '/login'} className="text-2xl font-bold text-white hover:text-gray-300">
          Short.ly
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            // Links to show WHEN LOGGED IN
            <>
              <span className="text-gray-300 hidden sm:block">
                Hi, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            // Links to show WHEN LOGGED OUT
            <>
              <Link
                to="/login"
                className="hover:bg-gray-700 py-2 px-3 rounded-md text-sm font-medium transition duration-150"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition duration-150"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

