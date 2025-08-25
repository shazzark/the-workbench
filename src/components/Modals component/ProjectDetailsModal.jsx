// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
function ProjectDetailsModal({ selectedProject, closeProjectDetails }) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeProjectDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center relative">
              <div className="text-7xl text-primary-500 dark:text-primary-400 font-bold">
                {selectedProject.name.charAt(0)}
              </div>
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 bg-white dark:bg-neutral-700 p-2 rounded-full shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-600 dark:text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-serif font-bold text-neutral-800 dark:text-white">
                  {selectedProject.name}
                </h2>
                {selectedProject.stack && selectedProject.stack.length > 0 && (
                  <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium px-3 py-1 rounded-full">
                    {Array.isArray(selectedProject.stack)
                      ? selectedProject.stack.join(", ")
                      : selectedProject.stack}
                  </span>
                )}
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {selectedProject.description}
              </p>

              {selectedProject.stack && selectedProject.stack.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
                    Tech Stack:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(selectedProject.stack) ? (
                      selectedProject.stack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium px-2.5 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium px-2.5 py-1 rounded">
                        {selectedProject.stack}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Visit Live Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectDetailsModal;
