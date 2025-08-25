// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function ContactForm({ form, handleChange, handleSubmit, isSubmitting }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
          placeholder="What is this regarding?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
          placeholder="How can we help you?"
        />
      </div>

      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
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
              Sending Message...
            </div>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </div>
    </form>
  );
}

export default ContactForm;
