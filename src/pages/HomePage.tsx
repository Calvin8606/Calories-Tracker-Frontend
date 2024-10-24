import { Link } from "react-router-dom";

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  return (
    <div>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center h-screen pt-24 bg-gray-100">
          <h1 className="text-6xl font-bold mb-8">Welcome</h1>
          <Link to="/login">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition">
              Log In
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen pt-24 bg-gray-100">
          <h1 className="text-6xl font-bold mb-8">ur logged in</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
