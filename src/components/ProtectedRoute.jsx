import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// Trying .js extension, as .jsx failed
import AuthContext from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

