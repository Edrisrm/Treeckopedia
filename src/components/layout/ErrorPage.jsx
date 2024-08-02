import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found.</h1>
      <iframe src="https://giphy.com/embed/qPuhFBQt8xLEY" width="480" height="360"  frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/puppy-follow-for-qPuhFBQt8xLEY"></a></p>
      <p className="mt-4 text-xl">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
