function Logo() {
  const src = "/public/The-workbench-logo.png";

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Logo */}
      <div className="h-20 w-auto">
        <img
          src={src}
          alt="The Workbench Logo"
          className="h-full w-full object-contain transition-transform hover:scale-105"
        />
      </div>

      {/* Sidebar icon */}
      {/* <button className="p-2 rounded-md hover:bg-gray-100">
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button> */}
    </div>
  );
}

export default Logo;
