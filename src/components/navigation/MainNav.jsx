// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import SidebarLink from "./SidebarLink";

function MainNav() {
  return (
    <nav>
      <motion.ul
        className="flex flex-col gap-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.li whileHover={{ scale: 1.05 }}>
          <SidebarLink to="/" Icon={HomeIcon}>
            Dashboard
          </SidebarLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }}>
          <SidebarLink to="/projects" Icon={FolderIcon}>
            Projects
          </SidebarLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }}>
          <SidebarLink to="/projects/add" Icon={PlusCircleIcon}>
            Add Project
          </SidebarLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }}>
          <SidebarLink to="/contact" Icon={EnvelopeIcon}>
            Contact
          </SidebarLink>
        </motion.li>
      </motion.ul>
    </nav>
  );
}

export default MainNav;
