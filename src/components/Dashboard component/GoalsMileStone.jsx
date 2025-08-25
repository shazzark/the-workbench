// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
function GoalsMileStone() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
          Learning Goals
        </h2>
        <button className="p-2 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-white">
              Learn Nest.js
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              60%
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Target: By September 2023
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-white">
              Master React Native
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              30%
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{ width: "30%" }}
            ></div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Target: By November 2023
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-white">
              AWS Certification
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              10%
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{ width: "10%" }}
            ></div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Target: By December 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default GoalsMileStone;
