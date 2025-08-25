import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  HiBars3BottomRight,
  HiMiniBars3BottomLeft,
  HiOutlineArrowLeftStartOnRectangle,
  HiEllipsisVertical,
} from "react-icons/hi2";
import SearchDropDown from "../HeaderComponent/SearchDropDown";
import UserAvatar from "./UserAvatar";
import SignoutPage from "../../pages/SignoutPage";

function Header({ toggleSidebar, handleProjectSelect, projects }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showsvg, setShowsvg] = useState(false);
  const [showNavIcons, setShowNavIcons] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleNavIcons = () => {
    setShowNavIcons(!showNavIcons);
  };

  const handleToggle = () => {
    setShowsvg(!showsvg);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setShowDropdown(false);
    }
  };

  // Add event listener for closing dropdown when clicking outside
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-neutral-900 p-4 px-4 sm:px-8 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between relative">
      {/* Grouped left section - Hamburger menu and Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger menu */}
        <div>
          <button
            onClick={() => {
              handleToggleNavIcons();
              toggleSidebar();
            }}
            className="p-2 rounded-lg transition-colors
              bg-neutral-100 hover:bg-neutral-200
              dark:bg-neutral-800 dark:hover:bg-neutral-700"
            aria-label="Toggle navigation"
          >
            {showNavIcons ? (
              <HiMiniBars3BottomLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <HiBars3BottomRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <SearchDropDown projects={projects} onSelect={handleProjectSelect} />
        </div>
      </div>

      {/* Right side icons - visible on larger screens */}
      <div className="hidden md:flex items-center gap-5">
        {/* Theme Toggle */}
        <div onClick={handleToggle}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors
               bg-neutral-100 hover:bg-neutral-200
               dark:bg-neutral-800 dark:hover:bg-neutral-700"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* User Avatar */}
        <UserAvatar />

        <div
          className="p-2 rounded-lg transition-colors
              bg-neutral-100 hover:bg-neutral-200
              dark:bg-neutral-800 dark:hover:bg-neutral-700"
          aria-label="Go to homepage"
        >
          <SignoutPage />
        </div>
      </div>

      {/* Dropdown menu for smaller screens */}
      <div className="md:hidden dropdown-container">
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-lg transition-colors
            bg-neutral-100 hover:bg-neutral-200
            dark:bg-neutral-800 dark:hover:bg-neutral-700"
          aria-label="More options"
        >
          <HiEllipsisVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {showDropdown && (
          <div className="absolute right-4 top-16 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 w-48 py-2">
            {/* Theme Toggle in dropdown */}
            <div className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <button
                onClick={() => {
                  toggleTheme();
                  setShowDropdown(false);
                }}
                className="flex items-center w-full text-left"
                aria-label="Toggle dark mode"
              >
                <span className="mr-2">{theme === "light" ? "🌙" : "☀️"}</span>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>

            {/* User Avatar in dropdown */}
            <div className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <UserAvatar />
            </div>

            {/* Sign out in dropdown */}
            <div className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <SignoutPage />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
