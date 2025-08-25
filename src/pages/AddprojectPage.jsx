// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import Select from "react-select";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../services/supabase";
import AddProjectForm from "../components/AddProject component/AddProjectForm";
import { ThemeContext } from "../context/ThemeContext";
import { getReactSelectStyles } from "../utils/getReactSelectStyles";
// import { getReactSelectStyles } from "../utils/reactSelectStyles";

function AddProject() {
  const { setProject } = useOutletContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select();

      if (error) {
        throw error;
      }

      // Update local state with the returned data (which includes the ID from Supabase)
      const newProject = {
        ...projectData,
        id: data[0].id,
        created_at: data[0].created_at,
      };

      setProject((prev) => [...prev, newProject]);

      // Reset form
      setForm({ name: "", stack: [], description: "", link: "" });

      // Show success toast
      toast.success("Project added successfully!", {
        duration: 4000,
        position: "top-right",
        icon: "🚀",
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #1e293b",
        },
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(`Failed to add project: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get styles based on current theme
  const customStyles = getReactSelectStyles(theme);

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
            Add New Project
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Showcase your work by adding a new project to your portfolio
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700"
        >
          <AddProjectForm
            form={form}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            handleStackChange={handleStackChange}
            techStackOptions={techStackOptions}
            customStyles={customStyles}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl border border-primary-100 dark:border-primary-800"
        >
          <div className="flex items-start">
            <div className="text-primary-500 dark:text-primary-400 mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
                Project Tips
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Make sure to include a clear description of your project and
                select the appropriate tech stack. Adding a live link or
                repository URL helps visitors explore your work.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AddProject;
