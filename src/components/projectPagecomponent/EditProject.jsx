// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";

import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../services/supabase";
import { ThemeContext } from "../../context/ThemeContext";
import { getReactSelectStyles } from "../../utils/getReactSelectStyles";
import EditProjectForm from "./EditProjectForm";

function EditProject() {
  const { Project } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState(null);
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: "",
    stack: [],
    description: "",
    link: "",
  });

  // Tech stack options for react-select
  const techStackOptions = [
    { value: "Html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Ruby", label: "Ruby" },
    { value: "Rails", label: "Rails" },
    { value: "PHP", label: "PHP" },
    { value: "Laravel", label: "Laravel" },
    { value: "React", label: "React" },
    { value: "Next.js", label: "Next.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express", label: "Express" },
    { value: "TailwindCSS", label: "TailwindCSS" },
    { value: "Supabase", label: "Supabase" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Other", label: "Other" },
  ];

  // Load project data when component mounts
  useEffect(() => {
    const foundProject = Project.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setForm({
        name: foundProject.name || "",
        stack: Array.isArray(foundProject.stack)
          ? foundProject.stack.map((tech) => ({ value: tech, label: tech }))
          : foundProject.stack
          ? [{ value: foundProject.stack, label: foundProject.stack }]
          : [],
        description: foundProject.description || "",
        link: foundProject.link || "",
      });
    } else {
      toast.error("Project not found");
      navigate("/projects");
    }
  }, [id, Project, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleStackChange(selectedOptions) {
    setForm({ ...form, stack: selectedOptions });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!form.name || !form.description || form.stack.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for Supabase
      const projectData = {
        name: form.name,
        stack: form.stack.map((option) => option.value), // Extract just the values
        description: form.description,
        link: form.link || null, // Set to null if empty
        updated_at: new Date().toISOString(),
      };

      // Update in Supabase
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Project updated successfully!", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #1e293b",
        },
      });

      // Navigate back to projects page
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(`Failed to update project: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get styles based on current theme
  const customStyles = getReactSelectStyles(theme);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 ">
          <h1 className="text-3xl font-serif font-bold text-neutral-800 dark:text-white mb-2">
            Edit Project
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Update your project details
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700"
        >
          {/* {editProjectForm} */}
          <EditProjectForm
            form={form}
            handleChange={handleChange}
            handleStackChange={handleStackChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            techStackOptions={techStackOptions}
            customStyles={customStyles}
            navigate={navigate}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EditProject;
