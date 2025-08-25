import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

function AppLayout() {
  const [Project, setProject] = useState([]);
  const [contact, setContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch projects from Supabase on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  function handleProjectSelect(projectID) {
    navigate(`/projects/${projectID}`);
  }

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  async function HandleaddProject(newProject) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([newProject])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setProject((prevProjects) => [...prevProjects, data[0]]);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }

  function handlecontactSubmit(newContact) {
    setContact(newContact);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading your projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid h-screen grid-rows-[auto_1fr] ${
        isOpen ? "grid-cols-[20rem_1fr]" : "grid-cols-[0_1fr]"
      }`}
    >
      <Header
        toggleSidebar={toggleSidebar}
        projects={Project}
        handleProjectSelect={handleProjectSelect}
      />

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="bg-gray-0 dark:bg-neutral-900 p-16 pb-24 overflow-scroll">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet
            context={{
              Project,
              setProject, // Pass the state setter for updates
              addProject: HandleaddProject, // Pass the add function
              contact,
              setContact,
              handlecontactSubmit,
              supabase, // Pass the supabase client
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
