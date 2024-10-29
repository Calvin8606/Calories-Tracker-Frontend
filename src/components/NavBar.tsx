import { Link } from "react-router-dom";

interface LinkType {
  name: string;
  path: string;
}

interface NavbarProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, handleLogout }) => {
  // Define links for non-authenticated users
  const guestLinks: LinkType[] = [
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="bg-[#4387f6] text-white fixed top-0 w-full z-50 h-16 flex items-center shadow-md">
      {/* Logo/Home Link */}
      <Link
        to="/"
        className="text-2xl font-bold h-full flex items-center px-4 hover:bg-blue-700 transition-colors duration-200"
      >
        MyCaloriesTracker
      </Link>

      {/* Dynamic Navigation Links */}
      <div className="flex space-x-6 h-full ml-auto">
        {!isAuthenticated &&
          guestLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="h-full flex items-center px-4 hover:bg-blue-700 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

        {/* Logout Button for Authenticated Users */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="h-full flex items-center px-4 hover:bg-blue-700 transition-colors duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
