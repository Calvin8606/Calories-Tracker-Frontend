import React from "react";
import { Link } from "react-router-dom";

interface LinkType {
  name: string;
  path: string;
}

interface NavbarProps {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
}

const SideNavBar: React.FC<NavbarProps> = ({
  isAuthenticated,
  isProfileComplete,
}) => {
  // Define links for authenticated users
  const authLinks: LinkType[] = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Calendar", path: "/calendar" },
    { name: "Graph", path: "/graph" },
  ];

  return isAuthenticated && isProfileComplete ? (
    <nav className="bg-gray-100 text-black fixed top-16 left-0 h-[calc(100%-4rem)] w-56 z-50 flex flex-col shadow-lg border-r border-gray-300">
      {/* Dynamic Navigation Links */}
      <div className="flex flex-col mt-4 gap-0">
        {authLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="w-full py-2 px-2 text-left hover:bg-gray-200 transition-colors duration-200 text-lg"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  ) : null;
};

export default SideNavBar;
