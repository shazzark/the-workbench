// UserAvatar.jsx
// import { useAuth } from "../hooks/useAuth";

import { useAuth } from "../../hooks/useAuth";

function UserAvatar() {
  const { user } = useAuth();

  // Get data safely
  const name = user?.user_metadata?.full_name || user?.email || "Guest";
  const avatar =
    user?.user_metadata?.avatar_url || "https://via.placeholder.com/150"; // fallback image

  return (
    <div className="flex gap-3 items-center font-medium text-sm text-neutral-700 dark:text-neutral-300">
      <div className="relative">
        <img
          className="block w-9 h-9 aspect-square object-cover object-center rounded-full outline outline-2 outline-primary-500"
          src={avatar}
          alt={name}
        />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 border-2 border-white dark:border-neutral-800 rounded-full"></span>
      </div>
      <span>{name}</span>
      {/* dropdown icon */}
      <svg
        className="h-4 w-4 text-neutral-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default UserAvatar;
