import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// Use NAMED import
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  // 2. If loading is done and there is NO user, redirect to login
  if (!user) {
    // 'replace' stops the user from using the "back" button
    // to go back to the protected page after being redirected.
    return <Navigate to="/login" replace />;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

