// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function ContactAlredyExist({ contact }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center py-12"
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-success-500 dark:text-success-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <h2 className="text-2xl font-serif font-bold text-neutral-800 dark:text-white mb-4">
          Thank you for contacting us, {contact.name}!
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          We've received your message and will get back to you within 24 hours
          at
        </p>

        <p className="text-primary-600 dark:text-primary-400 font-medium mb-8">
          {contact.email}
        </p>

        <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-5 text-left mb-8">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-2">
            Your Message:
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300">
            {contact.message}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Send Another Message
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ContactAlredyExist;
