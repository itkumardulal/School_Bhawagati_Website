import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo1 from "../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopFeedOpen, setDesktopFeedOpen] = useState(false); // Desktop click dropdown
  const [mobileFeedOpen, setMobileFeedOpen] = useState(false); // Mobile click dropdown
  const location = useLocation();
  const feedRef = useRef(null);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Academic Info", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Clubs", path: "/club" },
    //  { name: "Blog", path: "/blogs" }
  ];

  const feedItems = [
    { name: "News", path: "/news" },
    { name: "Notices", path: "/notices" },
    { name: "Blog", path: "/blogs" },
  ];

  const isActive = (path) => location.pathname === path;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Close desktop dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (feedRef.current && !feedRef.current.contains(event.target)) {
        setDesktopFeedOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="pl-2">
            <img src={logo1} alt="Bhawagati School Logo" className="h-20" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8 font-semibold">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-yellow-600 font-body ${
                  isActive(item.path)
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Feed Dropdown (Desktop - Click) */}
            <div className="relative" ref={feedRef}>
              <button
                onClick={() => setDesktopFeedOpen(!desktopFeedOpen)}
                className={`flex items-center text-lg font-medium transition-colors hover:text-yellow-600 font-body ${
                  feedItems.some((f) => isActive(f.path))
                    ? "text-yellow-600 border-b-2 border-yellow-600"
                    : "text-gray-500"
                }`}
              >
                Feed <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {desktopFeedOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md z-50">
                  {feedItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDesktopFeedOpen(false)}
                      className={`block px-4 py-2 text-base font-medium hover:bg-gray-100  hover:text-yellow-500 transition font-body ${
                        isActive(item.path)
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admissions"
              className="ml-2 mr-2 px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-lg font-button"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-md hover:bg-gray-100 transition"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden px-4 pb-4 pt-2 bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium transition-colors hover:text-yellow-600 font-body ${
                  isActive(item.path) ? "text-yellow-600" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Feed Dropdown (Mobile - Click) */}
            <div>
              <button
                onClick={() => setMobileFeedOpen(!mobileFeedOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-gray-600 hover:text-yellow-600 font-body   "
              >
                Feed <ChevronDown className="h-4 w-4" />
              </button>
              {mobileFeedOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-2">
                  {feedItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileFeedOpen(false);
                      }}
                      className={`text-base font-medium transition-colors hover:text-yellow-600 font-body ${
                        isActive(item.path)
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition font-button"
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
