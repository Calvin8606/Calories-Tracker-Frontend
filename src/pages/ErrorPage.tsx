import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You must be logged in to view this page.
      </p>
      <Link to="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Login Page
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
