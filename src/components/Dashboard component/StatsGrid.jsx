// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code, MessageSquare, Target, TrendingUp } from "lucide-react";

function StatsGrid({
  Project,
  contactData,
  stackData,
  topStack,
  linkPercentage,
  projectsWithLinks,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Total Projects
            </p>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mt-1">
              {Project.length}
            </h3>
          </div>
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Code
              size={20}
              className="text-primary-600 dark:text-primary-400"
            />
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
          {Project.length > 0
            ? `${projectsWithLinks} with demo links`
            : "No projects yet"}
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Contact Messages
            </p>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mt-1">
              {contactData.length}
            </h3>
          </div>
          <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
            <MessageSquare
              size={20}
              className="text-secondary-600 dark:text-secondary-400"
            />
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
          {contactData.length > 0
            ? "Total messages received"
            : "No messages yet"}
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Tech Stacks Used
            </p>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mt-1">
              {stackData.length}
            </h3>
          </div>
          <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
            <TrendingUp
              size={20}
              className="text-success-600 dark:text-success-400"
            />
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
          {topStack
            ? `${topStack.name} is most used`
            : "Add projects to see stats"}
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Portfolio Health
            </p>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mt-1">
              {linkPercentage}%
            </h3>
          </div>
          <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
            <Target
              size={20}
              className="text-warning-600 dark:text-warning-400"
            />
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
          Projects with demo links
        </p>
      </div>
    </motion.div>
  );
}

export default StatsGrid;
