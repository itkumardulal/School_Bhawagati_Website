
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4">
      <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-4">Oops! Page Not Found</h2>
      <p className="text-white text-lg mb-8 max-w-md text-center drop-shadow-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-white hover:cursor-pointer text-pink-600 font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-pink-600 hover:text-white transition"
        aria-label="Return to Home"
      >
        Return to Home
      </button>
    </div>
  );
};

export default NotFound;
