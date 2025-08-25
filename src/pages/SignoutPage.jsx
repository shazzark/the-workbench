// src/components/SignoutPage.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";

function SignoutPage() {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <>
      <HiOutlineArrowLeftStartOnRectangle
        className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Confirm Sign Out
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-700 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignoutPage;
