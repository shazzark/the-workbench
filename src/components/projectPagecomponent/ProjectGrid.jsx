// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ThreeDotMenu from "./ThreeDotMenu";
function ProjectGrid({
  filteredProjects,
  openProjectDetails,
  menuOpen,
  toggleMenu,
  handleEditProject,
  setDeleteConfirm,
}) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow cursor-pointer relative"
            onClick={() => openProjectDetails(project)}
          >
            {/* Three-dot menu button */}
            <ThreeDotMenu
              project={project}
              menuOpen={menuOpen}
              toggleMenu={toggleMenu}
              handleEditProject={handleEditProject}
              setDeleteConfirm={setDeleteConfirm}
            />

            <div className="h-48 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
              <div className="text-5xl text-primary-500 dark:text-primary-400 font-bold">
                {project.name.charAt(0)}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-white truncate">
                  {project.name}
                </h2>
                {project.stack && project.stack.length > 0 && (
                  <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded">
                    {Array.isArray(project.stack)
                      ? project.stack[0]
                      : project.stack}
                    {Array.isArray(project.stack) &&
                      project.stack.length > 1 &&
                      ` +${project.stack.length - 1}`}
                  </span>
                )}
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4">
                {project.description}
              </p>

              <div className="flex justify-between items-center">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm flex items-center"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}

                <button
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectDetails(project);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectGrid;
