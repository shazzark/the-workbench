// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
function ThreeDotMenu({
  project,
  menuOpen,
  toggleMenu,
  handleEditProject,
  setDeleteConfirm,
}) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={(e) => toggleMenu(project.id, e)}
        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        <Icon
          icon="heroicons:ellipsis-horizontal"
          className="w-5 h-5 text-neutral-600 dark:text-neutral-300"
        />
      </button>

      {/* Dropdown menu */}
      {menuOpen === project.id && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-700 rounded-md shadow-lg py-1 z-20 border border-neutral-200 dark:border-neutral-600"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditProject(project);
            }}
            className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 w-full text-left"
          >
            <Icon icon="heroicons:pencil-square" className="w-4 h-4 mr-2" />
            Edit Project
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(project);
            }}
            className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-600 w-full text-left"
          >
            <Icon icon="heroicons:trash" className="w-4 h-4 mr-2" />
            Delete Project
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ThreeDotMenu;
