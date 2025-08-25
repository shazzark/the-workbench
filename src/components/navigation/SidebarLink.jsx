// SidebarLink.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";

function SidebarLink({ to, Icon, children, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </NavLink>
    </motion.div>
  );
}

export default SidebarLink;
