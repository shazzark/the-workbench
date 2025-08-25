// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Download, Share2, ChevronRight } from "lucide-react";
function ExportSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
    >
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-6">
        Export & Share
      </h2>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
          <div className="flex items-center">
            <Download
              size={20}
              className="text-neutral-600 dark:text-neutral-400 mr-3"
            />
            <span className="dark:text-white">Export as JSON</span>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
          <div className="flex items-center">
            <Download
              size={20}
              className="text-neutral-600 dark:text-neutral-400 mr-3"
            />
            <span className="dark:text-white">Export as PDF</span>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
          <div className="flex items-center">
            <Share2
              size={20}
              className="text-neutral-600 dark:text-neutral-400 mr-3"
            />
            <span className="dark:text-white">Share Portfolio</span>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>
      </div>
    </motion.div>
  );
}

export default ExportSection;
