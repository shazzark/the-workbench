// src/pages/ProjectDetailsPage.jsx
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useState, useRef } from "react";
import {
  HiPencil,
  HiTrash,
  HiArrowLeft,
  HiLink,
  HiCalendar,
  HiDotsVertical,
} from "react-icons/hi";
import toast from "react-hot-toast";
import ProjectDeleteModal from "../components/Modals component/ProjectDeleteModal";
 

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Project, supabase, setProject } = useOutletContext();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const project = Project.find((proj) => proj.id === id);

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
          Project not found
        </h2>
        <button
          onClick={() => navigate("/projects")}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Back to Projects
        </button>
      </motion.div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (error) throw error;

      setProject((prev) => prev.filter((p) => p.id !== project.id));
      toast.success("Project deleted successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <HiArrowLeft size={20} />
          Back to Projects
        </button>

        {/* Three-dot Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg transition-all duration-200
              bg-neutral-100 hover:bg-neutral-200
              dark:bg-neutral-800 dark:hover:bg-neutral-700
              hover:scale-105 active:scale-95"
            aria-label="Project options"
          >
            <HiDotsVertical className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 w-48 py-2 overflow-hidden"
              >
                {/* Edit Option */}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate(`/edit-project/${project.id}`);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-neutral-700 dark:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150"
                >
                  <HiPencil className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Edit Project</span>
                </button>

                {/* Delete Option */}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setDeleteConfirm(project.id);
                  }}
                  disabled={isDeleting}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 disabled:opacity-50"
                >
                  <HiTrash className="w-5 h-5" />
                  <span className="font-medium">
                    {isDeleting ? "Deleting..." : "Delete Project"}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Content */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700">
        {/* Title */}
        <h1 className="text-4xl font-serif font-bold text-neutral-800 dark:text-white mb-4">
          {project.name}
        </h1>

        {/* Date */}
        {project.created_at && (
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-6">
            <HiCalendar size={18} />
            <span>Created on {formatDate(project.created_at)}</span>
          </div>
        )}

        {/* Tech Stack */}
        {project.stack && project.stack.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
              Description
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Project Link */}
        {project.link && (
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
            >
              <HiLink size={18} />
              View Live Project
            </a>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ProjectDeleteModal
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDeleteProject={handleDelete}
        isDeleting={isDeleting}
      />
    </motion.div>
  );
}

export default ProjectDetailsPage;
