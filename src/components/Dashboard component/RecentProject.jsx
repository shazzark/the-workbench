// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronRight, Code, ExternalLink } from "lucide-react";

function RecentProject({ recentProjects }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
          Recent Projects
        </h2>
        <a
          href="/projects"
          className="text-primary-500 text-sm flex items-center hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          View all <ChevronRight size={16} />
        </a>
      </div>

      {recentProjects.length > 0 ? (
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
            >
              <div>
                <h3 className="font-medium text-neutral-800 dark:text-white">
                  {project.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {Array.isArray(project.stack)
                    ? project.stack.join(", ")
                    : project.stack || "No stack specified"}
                </p>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-500 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
          <Code
            size={40}
            className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600"
          />
          <p>No projects yet</p>
          <a
            href="/add-project"
            className="text-primary-500 text-sm mt-2 inline-block hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Add your first project
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default RecentProject;
