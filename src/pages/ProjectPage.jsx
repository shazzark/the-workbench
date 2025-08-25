// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import ProjectDeleteModal from "../components/Modals component/ProjectDeleteModal";
import ProjectDetailsModal from "../components/Modals component/ProjectDetailsModal";
import ProjectGrid from "../components/projectPagecomponent/ProjectGrid";
import ProjectFilter from "../components/projectPagecomponent/ProjectFilter";

function ProjectPage() {
  const { Project, supabase } = useOutletContext();
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  // Get all unique tech stacks for filtering (flatten arrays)
  const allStacks = [
    "All",
    ...new Set(
      Project.flatMap((project) =>
        Array.isArray(project.stack) ? project.stack : [project.stack]
      ).filter(Boolean)
    ),
  ];

  // Filter projects based on selected stack
  const filteredProjects =
    filter === "All"
      ? Project
      : Project.filter((project) => {
          const projectStack = Array.isArray(project.stack)
            ? project.stack
            : project.stack
            ? [project.stack]
            : [];
          return projectStack.includes(filter);
        });

  // Function to open project details
  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  // Function to close project details
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Toggle menu for a specific project
  const toggleMenu = (projectId, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === projectId ? null : projectId);
  };

  // Close menu when clicking elsewhere
  const closeMenu = () => {
    setMenuOpen(null);
  };

  // Function to handle project deletion
  const handleDeleteProject = async (projectId) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      // Close the modal and show success message
      setDeleteConfirm(null);
      toast.success("Project deleted successfully!");

      // Refresh the page to see updated projects
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project. Please try again.");
    }
  };

  // Function to handle project editing
  const handleEditProject = (project) => {
    navigate(`/edit-project/${project.id}`, { state: { project } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" onClick={closeMenu}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-serif font-bold text-neutral-800 dark:text-white mb-3">
          My Projects
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          A collection of my work showcasing various technologies and solutions
          I've implemented.
        </p>
      </motion.div>

      {/* Filter buttons */}
      {Project.length > 0 && (
        <ProjectFilter
          allStacks={allStacks}
          filter={filter}
          setFilter={setFilter}
        />
      )}

      {/* Projects grid */}
      {filteredProjects.length > 0 ? (
        <ProjectGrid
          filteredProjects={filteredProjects}
          openProjectDetails={openProjectDetails}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          handleEditProject={handleEditProject}
          setDeleteConfirm={setDeleteConfirm}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <div className="text-neutral-300 dark:text-neutral-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            No projects found
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            {filter === "All"
              ? "You haven't added any projects yet."
              : `No projects found with the ${filter} stack.`}
          </p>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailsModal
        selectedProject={selectedProject}
        closeProjectDetails={closeProjectDetails}
      />
      {/* Delete Confirmation Modal */}
      <ProjectDeleteModal
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
}

export default ProjectPage;
