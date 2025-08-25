// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
function ContactDiv({ contactData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
          Recent Messages
        </h2>
      </div>

      {contactData.length > 0 ? (
        <div className="space-y-4">
          {contactData.slice(0, 3).map((message, index) => (
            <div
              key={index}
              className="p-3 border border-neutral-100 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-neutral-800 dark:text-white">
                  {message.name}
                </h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                {message.subject}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
          <MessageSquare
            size={40}
            className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600"
          />
          <p>No messages yet</p>
          <p className="text-sm mt-2">
            Contact form submissions will appear here
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default ContactDiv;
