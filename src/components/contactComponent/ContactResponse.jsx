// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
function ContactResponse() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl border border-primary-100 dark:border-primary-800">
        <div className="text-primary-500 dark:bg-primary-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
          Email Us
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      <div className="bg-secondary-50 dark:bg-secondary-900/20 p-6 rounded-xl border border-secondary-100 dark:border-secondary-800">
        <div className="text-secondary-500 dark:bg-secondary-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
          Quick Response
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Our team is dedicated to providing timely and helpful responses.
        </p>
      </div>

      <div className="bg-success-50 dark:bg-success-900/20 p-6 rounded-xl border border-success-100 dark:border-success-800">
        <div className="text-success-500 dark:bg-success-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
          Secure
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Your information is safe with us. We respect your privacy.
        </p>
      </div>
    </motion.div>
  );
}

export default ContactResponse;
