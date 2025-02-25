import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-gray-900">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
