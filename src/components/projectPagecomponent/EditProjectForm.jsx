// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function EditProjectForm({
  form,
  handleChange,
  handleStackChange,
  handleSubmit,
  isSubmitting,
  techStackOptions,
  customStyles,
}) {
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Project Name *
        </label>
        <input
          type="text"
          name="name"
          placeholder="e.g., E-commerce Website"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
        />
      </div>

      {/* Tech Stack Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Tech Stack *
        </label>
        <Select
          isMulti
          name="stack"
          options={techStackOptions}
          value={form.stack}
          onChange={handleStackChange}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customStyles}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Description *
        </label>
        <textarea
          name="description"
          placeholder="Describe your project, its features, and your role in it..."
          value={form.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
        />
      </div>

      {/* Project Link */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Project Link
        </label>
        <input
          type="url"
          name="link"
          placeholder="https://yourproject.com"
          value={form.link}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
        />
      </div>

      <div className="pt-4 flex gap-3">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="py-3 px-6 rounded-lg font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isSubmitting
              ? "bg-primary-400 cursor-not-allowed"
              : "bg-primary-500 hover:bg-primary-600"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating Project...
            </div>
          ) : (
            "Update Project"
          )}
        </motion.button>
      </div>
    </form>
  );
}

export default EditProjectForm;
