// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
function ProjectFilter({ allStacks, filter, setFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {allStacks.map((stack) => (
        <button
          key={stack}
          onClick={() => setFilter(stack)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === stack
              ? "bg-primary-500 text-white"
              : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600"
          }`}
        >
          {stack}
        </button>
      ))}
    </motion.div>
  );
}

export default ProjectFilter;
