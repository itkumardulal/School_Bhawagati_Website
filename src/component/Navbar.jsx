import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo1 from "../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Academic Info", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Notice Board", path: "/notices" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/">
            <img src={logo1} alt="Bhawagati School Logo" className="h-24" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-yellow-600 ${
                  isActive(item.path)
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admissions"
              className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel - Dropdown from Top */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium transition-colors hover:text-yellow-600 ${
                  isActive(item.path) ? "text-yellow-600" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
