// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
function HeaderSection({ setShowQuickStats, showQuickStats, quickStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-serif font-bold text-neutral-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Overview of your portfolio and activities
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowQuickStats(!showQuickStats)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Eye size={18} />
          Quick Stats
        </button>

        {showQuickStats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-12 bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-4 w-64 z-10 border border-neutral-200 dark:border-neutral-700"
          >
            <h3 className="font-medium text-neutral-800 dark:text-white mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Total Projects:
                </span>
                <span className="font-medium dark:text-white">
                  {quickStats.totalProjects}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Top Stack:
                </span>
                <span className="font-medium dark:text-white">
                  {quickStats.topStack}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Recent Project:
                </span>
                <span className="font-medium truncate max-w-[120px] dark:text-white">
                  {quickStats.recentProject}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Total Messages:
                </span>
                <span className="font-medium dark:text-white">
                  {quickStats.totalMessages}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default HeaderSection;
